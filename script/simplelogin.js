"use strict";

var Firebase,
FirebaseSimpleLogin,
email,
google,
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

function messages(msg) {
    $(document).ready(function () {
        $('#message').text(msg);
        var $message = $('#message');
        $message.fadeIn();
        if ($message.length) {
            setTimeout(function () {
                $message.fadeOut();
            }, 5000);
        }
    });
}

function register () {
    email = $('#emailInput').val();
    password = $('#passwordInput').val();
    authClient.createUser(email, password, function(error,  user) {
        if (!error) {
            removeValue();
            removeModal();
            messages('Welcome to TripShotsmapper ' + user.email + '! Continue to sign in and start to map your trips!');
            console.log('User Id: ' + user.uid + ', Email: ' + user.email);
        } else {
            alert(error);
        }
    });
}
  
function doLogin(email, password) {
    authClient.login('password', {
        email: $("#emailInput").val(),
        password: $("#passwordInput").val()
    });
    removeValue();
    removeModal();
    $('#signin_link').hide();
    $('#signout_link').show();
    messages('You are now logged in. Welcome to TripShotsmapper!');
} 

function signout () {
    initialize();
    authClient.logout();
    $('#signin_link').show();
    $('#signout_link').hide();
    messages('You are now signed out. Visit us again soon!');
    console.log('Logged out');
}

function saveData (marker) {
    var userRef = poppingFireRef.child('users/' + useruId + '/markers');
    var markerRef = userRef.push();
    markerRef.set({position: marker.getPosition().toUrlValue(), comment: marker.html});
    messages('Location added.');
    
    // Högerklicka för att ta bort markör
    google.maps.event.addListener(marker, "rightclick", function() {
        if (marker.getDraggable()) {
            marker.setMap(null);
        } else {
            markerRef.remove();
            marker.setMap(null);
        }
    });
}

function readData () {
    var userRef = poppingFireRef.child('users/' + useruId + '/markers');
    userRef.on('child_added', function(snapshot) {
        var userData = snapshot.val();
      
        console.log('Läst in '+ userData.position + ' and ' + userData.comment);
    });

}






