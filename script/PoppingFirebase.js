"use strict";

var Firebase,
FirebaseSimpleLogin,
email,
google,
password,
useruId,
$;

// Skapar Firebasereferens
var poppingFireRef = new Firebase("https://popping-fire-9647.firebaseio.com");

// Kontroll av inloggningsstatus
var authClient = new FirebaseSimpleLogin(poppingFireRef, function(error, user) {
    if (error) {
        // Fel vid inloggning
        messages(error);
        console.log(error);
    } else if (user) {
        // Användaren är inloggad och verifierad i Firebase
        useruId = user.uid;
        console.log('User ID: ' + user.uid + ', Provider: ' + user.provider);
    } else {
        // Användaren är inte inloggad
        console.log('Not logged in');
    }
});

// Funktion för borttag av text i textrutorna för modala popupen
function removeValue () {
    $('#email').val('');
    $('#password').val('');
}

// Funktion för borttag av modala popupen
function removeModal () {
    $('#modalDiv').remove();
    $('#bground').remove();
}

// Funktion för utskrift av meddelanden
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

// Registreringsfunktion i Firebase
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
            messages(error);
        }
    });
}

// Inloggningsfunktion i Firebase 
function doLogin(email, password) {
    authClient.login('password', {
        email: $("#emailInput").val(),
        password: $("#passwordInput").val()
    });
    removeValue();
    removeModal();
    $('#signin_link').hide();
    $('#signout_link').show();
    $('#saveButton').show();
    $('#showButton').show();
    messages('You are now logged in. Welcome to TripShotsmapper!');
    
    // Läser data från Firebase till kartan
    var showButton = document.getElementById("showButton");
    google.maps.event.addDomListener(showButton, 'click', function() {
        readData();
    });
} 

// Utloggningsfunktion i Firebase
function signout () {
    initialize();
    authClient.logout();
    $('#signin_link').show();
    $('#signout_link').hide();
    $('#saveButton').hide();
    $('#showButton').hide();
    messages('You are now signed out. Visit us again soon!');
    console.log('Logged out');
}

// Spararfunktion i Firebase
function saveData (marker) {
    var userRef = poppingFireRef.child('users/' + useruId + '/markers');
    var markerRef = userRef.push();
    markerRef.set({position: marker.getPosition(), comment: marker.html});
    marker.setDraggable(false);
    messages('The location has been successfully saved!');
            
    // Kopplar högerklickevent till markören för att ta bort den från Firebase
    google.maps.event.addListener(marker, "rightclick", function() {
        markerRef.remove();
        marker.setMap(null);
        messages('The marker has been successfully removed!');
    });
}

// Hämtning av data från Firebase
function readData () {
    var userRef = poppingFireRef.child('users/' + useruId + '/markers');
    userRef.on('child_added', function(snapshot) {
        var userLocation = snapshot.child('position').val();
        var userComment = snapshot.child('comment').val();
        var mylatLng = new google.maps.LatLng(parseFloat(userLocation.k), parseFloat(userLocation.A));
        placeMarker(mylatLng, userComment);
      
        console.log('Läst in '+ mylatLng + ' and ' + userComment);
    });
}








