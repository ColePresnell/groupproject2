$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
<<<<<<< HEAD
  var usernameInput = $("input#username-input");
=======
>>>>>>> d0feba5f98a94f0ef748f9e4de3663c5e52b72e3

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
<<<<<<< HEAD
      password: passwordInput.val().trim(),
      username: usernameInput.val().trim()
    };

    if (!userData.email || !userData.password || !userData.username) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.username);
    emailInput.val("");
    passwordInput.val("");
    usernameInput.val("");
=======
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
>>>>>>> d0feba5f98a94f0ef748f9e4de3663c5e52b72e3
  });

  // Does a post to the signup route. If succesful, we are redirected to the members page
  // Otherwise we log any errors
<<<<<<< HEAD
  function signUpUser(email, password, username) {
    $.post("/api/signup", {
      email: email,
      password: password,
      username: username
=======
  function signUpUser(email, password) {
    $.post("/api/signup", {
      email: email,
      password: password
>>>>>>> d0feba5f98a94f0ef748f9e4de3663c5e52b72e3
    }).then(function(data) {
      window.location.replace(data);
      // If there's an error, handle it by throwing up a boostrap alert
    }).catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
