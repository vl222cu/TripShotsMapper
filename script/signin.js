"use strict";

var Firebase,
FirebaseSimpleLogin,
email,
password,
$;

var myRef = new Firebase("https://popping-fire-9647.firebaseio.com");
var authClient = new FirebaseSimpleLogin(myRef, function(error, user) {
    if (error) {
        // an error occurred while attempting login
        console.log(error);
    } else if (user) {
        // user authenticated with Firebase
        console.log('User ID: ' + user.uid + ', Provider: ' + user.provider);
    } else {
        // user is logged out
        console.log('Not logged in');
    }
});

function register () {
    email = $('#email').val();
    password = $('#password').val();
    authClient.createUser(email, password, function(error,  user) {
        if (!error) {
            console.log('User Id: ' + user.uid + ', Email: ' + user.email);
            removeValue();
        } else {
            alert(error);
        }
    });
}
  
function doLogin(email, password) {
    authClient.login('password', {
        email: $("#email").val(),
        password: $("#password").val()
    });
    removeValue();
} 

function removeValue () {
    $('#email').val('');
    $('#password').val('');
}

