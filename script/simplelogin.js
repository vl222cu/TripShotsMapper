"use strict";

var Firebase,
FirebaseSimpleLogin,
email,
password,
useruId,
$;

var poppingFireRef = new Firebase("https://popping-fire-9647.firebaseio.com");
var authClient = new FirebaseSimpleLogin(poppingFireRef, function(error, user) {
    if (error) {
        // an error occurred while attempting login
        console.log(error);
    } else if (user) {
        useruId = user.uid;
        // user authenticated with Firebase
        console.log('User ID: ' + user.uid + ', Provider: ' + user.provider);
    } else {
        // user is logged out
        console.log('Not logged in');
    }
});

function removeValue () {
    $('#email').val('');
    $('#password').val('');
}

function removeModal () {
    $('#modalDiv').remove();
    $('#bground').remove();
}

function register () {
    email = $('#email').val();
    password = $('#password').val();
    authClient.createUser(email, password, function(error,  user) {
        if (!error) {
            removeValue();
            removeModal();
            $('#signin_link').hide();
            $('#signout_link').show();
            console.log('User Id: ' + user.uid + ', Email: ' + user.email);
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
    removeModal();
    $('#signin_link').hide();
    $('#signout_link').show();
} 

function signout () {
    clearMarkers();
    authClient.logout();
    $('#signin_link').show();
    $('#signout_link').hide();
    console.log('Logged out');
}

function saveData (marker) {
    var userRef = poppingFireRef.child('users/' + useruId);
    userRef.push({location: marker.getPosition()});
    readData();
}

function readData () {
    var userRef = poppingFireRef.child('users/' + useruId);
    userRef.on('child_added', function(snapshot) {
        var userData = snapshot.val();
        console.log('Läst in '+ userData);
    });

}



