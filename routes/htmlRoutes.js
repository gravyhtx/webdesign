module.exports = function(app) {
  // Load Home page
  app.get("/", (req, res) => {
    res.render("index");
  });
};
