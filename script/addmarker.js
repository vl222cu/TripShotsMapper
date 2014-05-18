"use strict";
var google,
mapCanvas,
map,
marker,
markers = [],
$;

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
            position : location,
            map : map,
            html: "Skriv gärna en kommentar!",
            icon : '../pics/pinkpin.png'
        });
        
        marker.set("editing", false);
        
        // Skapar kommentarsbox
        var htmlBox = document.createElement("div");
        htmlBox.id = "htmlbox";
        htmlBox.innerHTML = marker.html || "";
        var textBox = document.createElement("textarea");
        textBox.id = "textbox";
        textBox.innerText = marker.html || "";
        var editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        var container = document.createElement("div");
        container.id = "infocontainer";
        container.appendChild(htmlBox);
        container.appendChild(textBox);
        container.appendChild(editBtn);
    
    var infoWin = new google.maps.InfoWindow({
        content : container
        });
    
    google.maps.event.addListener(marker, 'click', function () {
        infoWin.open(map, marker);
    });
    
    google.maps.event.addDomListener(editBtn, "click", function() {
        marker.set("editing", !marker.editing);
    });
    
    google.maps.event.addListener(marker, "editing_changed", function(){
      textBox.style.display = marker.editing ? "block" : "none";
      htmlBox.style.display = marker.editing ? "none" : "block";
      editBtn.innerText = marker.editing ? "Save" : "Edit";
    });
    
    google.maps.event.addDomListener(textBox, "change", function(){
      htmlBox.innerHTML = textBox.value;
      marker.set("html", textBox.value);
    });
    
    var savebutton = document.getElementById("saveButton");
    google.maps.event.addDomListener(savebutton, 'click', function() {
    saveData(marker);
    });
}
        
google.maps.event.addDomListener(window, 'load', initialize);