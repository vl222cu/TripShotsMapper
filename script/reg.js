"use strict";
var Firebase,
FirebaseSimpleLogin,
email,
password,
$;

var signInRef = new Firebase("https://popping-fire-9647.firebaseio.com");
var authClient = new FirebaseSimpleLogin(signInRef, function(error, user) {
            if (error) {
                // an error occurred while attempting login
                console.log(error);
            } else if (user) {
                // user authenticated with Firebase
                console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
            } else {
                // user is logged out
                console.log('Not logged in');
            }
        });

    

  $("#registerButton").on("click", function(e) {
    authClient.createUser(email, password, function(error,  user) {
      if (!error) {
        console.log('User Id: ' + user.uid + ', Email: ' + user.email);
        doLogin(email, password);
      } else {
        alert(error);
      }
    email = $("#email").val('');
    password = $("#password").val('');
    });
  });
  
function doLogin(email, password) {
    authClient.login('password', {
        email: email,
        password: password
    });
}  
