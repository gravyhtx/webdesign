console.log("Service worker linked")

const FILES_TO_CACHE = [
    "/",
    "css/styles.css",
    "images/jc01.jpg",
    "images/spg1.jpg",
    "images/wa1.jpg",
    "favicon.ico",
    "images/icons/icon-72x72.png",
    "images/icons/icon-96x96.png",
    "images/icons/icon-128x128.png",
    "images/icons/icon-144x144.png",
    "images/icons/icon-152x152.png",
    "images/icons/icon-192x192.png",
    "images/icons/icon-384x384.png",
    "images/icons/icon-512x512.png",
  ];
  
const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";

// install
self.addEventListener("install", function(evt) {
evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
    console.log("Your files were pre-cached successfully!");
    return cache.addAll(FILES_TO_CACHE);
    })
);

self.skipWaiting();
});

self.addEventListener("activate", function(evt) {
evt.waitUntil(
    caches.keys().then(keyList => {
    return Promise.all(
        keyList.map(key => {
        if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            console.log("Removing old cache data", key);
            return caches.delete(key);
        }
        })
    );
    })
);

self.clients.claim();
});

function requestHandler(req, res) {
    res.setHeader('Strict-Transport-Security','max-age=31536000; includeSubDomains; preload');
}

// fetch
self.addEventListener("fetch", function(evt) {
// cache successful requests to the API
if (evt.request.url.includes("/api/")) {
    evt.respondWith(
    caches.open(DATA_CACHE_NAME).then(cache => {
        return fetch(evt.request)
        .then(response => {
            // If the response was good, clone it and store it in the cache.
            if (response.status === 200) {
            cache.put(evt.request.url, response.clone());
            }

            return response;
        })
        .catch(err => {
            // Network request failed, try to get it from the cache.
            return cache.match(evt.request);
        });
    }).catch(err => console.log(err))
    );

    return;
}

// if the request is not for the API, serve static assets using "offline-first" approach.
// see https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook#cache-falling-back-to-network
evt.respondWith(
    caches.match(evt.request).then(function(response) {
    return response || fetch(evt.request);
    })
);
});


  
self.addEventListener("fetch", function(event) {
    event.respondWith(
      fetch(event.request).catch(function(error) {
        console.log(
          "[Service Worker] Network request Failed. Serving content from cache: " +
            error
        );
        //Check to see if you have it in the cache
        //Return response
        //If not in the cache, then return error page
        return caches
          .open(
            "sw-precache-v3-sw-precache-webpack-plugin-https://silent-things.surge.sh"
          )
          .then(function(cache) {
            return cache.match(event.request).then(function(matching) {
              var report =
                !matching || matching.status == 404
                  ? Promise.reject("no-match")
                  : matching;
              return report;
            });
          });
      })
    );
  });