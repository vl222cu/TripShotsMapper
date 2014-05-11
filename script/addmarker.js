"use strict";
var google,
map,
Firebase;

function initialize () {
    var mapOptions = {
        center: new google.maps.LatLng(59.999999, 14.9999999),
        zoom: 2
    };
    
    map = new google.maps.Map(document.getElementById('markmap-canvas'),
    mapOptions);

    google.maps.event.addListener(map, 'click', function(event) {
        placeMarker(event.latLng);
  });
}

function placeMarker (location) {
    var marker = new google.maps.Marker({
    position: location,
    map: map,
    icon: '../pics/pinkpin.png'
  });
  
  saveMarker(marker);
}

function saveMarker (marker) {
   var myRef = new Firebase("https://popping-fire-9647.firebaseio.com");
   myRef.push({Location: marker.getPosition(), Icon: '../pics/pinkpin.png'});

}

google.maps.event.addDomListener(window, 'load', initialize);