"use strict";
var google;

function initialize() {
        var mapOptions = {
            center: new google.maps.LatLng(59.999999, 14.9999999),
            zoom: 2
        };
    
        var map = new google.maps.Map(document.getElementById('markmap-canvas'),
        mapOptions);
    
        var drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: google.maps.drawing.OverlayType.MARKER,
            drawingControl: true,
            drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [
                google.maps.drawing.OverlayType.MARKER,
                google.maps.drawing.OverlayType.CIRCLE,
            ]
        },
        
        markerOptions: {
            icon: '../pics/pinkpin.png',
        },
        
        circleOptions: {
            editable: true
        }
    });
    
    drawingManager.setMap(map);
}

google.maps.event.addDomListener(window, 'load', initialize);