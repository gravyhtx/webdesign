//Ready function which nests the login and signup functions.
$(document).ready(function() {
  //Consistent point of reference for id and classes within the handlebars files.
  const loginForm = $("#login");
  const signUpForm = $("form.signup");
  const emailInput = $("input#email");
  const passInput = $("input#password");
  // const firstInput = $("#first_name");
  // const lastInput = $("#last_name");
  // const userInput = $("#user_name");

  //Validate that an email and password have been entered
  // eslint-disable-next-line prettier/prettier
  loginForm.on("submit", (event) => {
    event.preventDefault();
    const userInfo = {
      email: emailInput.val().trim(),
      password: passInput.val().trim()
    };

    if (!userInfo.email || !userInfo.password) {
      return;
    }

    // Clears form if a valid email and password exists, and ryn loginUser.
    userLogin(userInfo.email, userInfo.password);
    emailInput.val("");
    passInput.val("");
  });

  //Post to api login which redirects user to home page if they are successfully able to login
  function userLogin(email, password) {
    $.post("/", {
      email: email,
      password: password
    })
      .then(function() {
        window.location.replace("/");
        // Logs error, if an error
      })
      .catch(function(err) {
        console.log(err);
      });
  }
  //Section begins the signup Portion of the JS-----------------------------------------------------------------------------------
  // eslint-disable-next-line prettier/prettier
  signUpForm.on("submit", (event) => {
    event.preventDefault();
    const userInfo = {
      // firstName:firstInput.val().trim(),
      // lastName:lastInput.val().trim(),
      // username: userInput.val().trim(),
      email: emailInput.val().trim(),
      password: passInput.val().trim()
    };
    if (!userInfo.email || !userInfo.password) {
      return;
    }
    console.log(userInfo);

    userSignUp(userInfo.email, userInfo.password);
    emailInput.val("");
    passInput.val("");
  });

  function userSignUp(email, password) {
    $.post("/api/signup", {
      email: email,
      password: password
    })
      .then(function(data) {
        console.log(data);
        window.location.replace("/");
      })
      .catch(function(err){
        console.log("ERROR IS " + err);
      });
  }
});

var isLoggedIn = true;

if (isLoggedIn == false) {
    $("div.customer-login").html('<h3><b>Login</b></h3>     <div class="col s12 formclass container row loginsignup z-depth-3"><form class="row col s12 login-form">    <div class="row input-field col s12">    <input id="login-username" type="text" class="validate">    <label for="login-username">Username</label></div> <br>  <div class="row input-field col s12">    <input id="login-password" type="text" class="validate">    <label for="login-password">Password</label></div><br><a href="/members" class="submit waves-effect waves-light btn" id="login-account">    LOG IN</a></form></div><br><div class="notamember">    <b>Not a member yet?</b></div><div class="row submitrow">    <a href="/signup" class="submit hit-subscribe waves-effect waves-light btn" id="signup-button"><b>CREATE ACCOUNT</b>    </a></div>')
}
else if (isLoggedIn == true) {
    $("div.customer-login").html('<div class="whitebkg">    <h3 class="h3profile"><b>Account Info</b></h3>     <div class="profile-details"><b>Logged in as <span class="modal-username"></span></b>    <br>    <div class="accountinfo container row loginsignup">    <div class="profile-details">    <b>First Name</b><div class="btmsp"><span class="modal-fname"></span></div>    <b>Last Name</b><div class="btmsp"><span class="modal-lname"></span></div>    <b>Email</b><div class="btmsp"><span class="modal-email"></span></div>    <br>    <b>Subscription</b><br><span class="modal-subscription"></span>    </div></div>    <div class="center">    <button class="submit hit-subscribe waves-effect waves-light btn" id="log-off"><b>LOG OFF</b></button></div>   <br></div></div></div> </div>')
}

