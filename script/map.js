"use strict";
var map,
google;

function initialize() {
  var mapOptions = {
    zoom: 2,
    center: new google.maps.LatLng(59.999999, 14.9999999)
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
}

google.maps.event.addDomListener(window, 'load', initialize);

