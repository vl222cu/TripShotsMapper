"use strict";
var google,
map,
markers = [];

function initialize () {
    var mapOptions = {
        center: new google.maps.LatLng(59.999999, 14.9999999),
        zoom: 2
    };
    
    map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);

    google.maps.event.addListener(map, 'click', function(event) {
        placeMarker(event.latLng);
    });
  
    function setAllMap (map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }

    function clearMarkers () {
        setAllMap(null);
    }
}

function placeMarker (location) {
    var marker = new google.maps.Marker({
    position: location,
    map: map,
    icon: '../pics/pinkpin.png'
  });
  
  saveData(marker);
}

google.maps.event.addDomListener(window, 'load', initialize);