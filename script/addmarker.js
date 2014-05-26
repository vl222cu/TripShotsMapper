"use strict";
var google,
map,
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
}
    // Från https://developers.google.com/maps/documentation/javascript/events
    function placeMarker (location, html) {
        var marker = new google.maps.Marker({
            position : location,
            map : map,
            draggable: true,
            html: html,
            icon : '../pics/pinkpin.png'
        });
        
        marker.set("editing", false);
        
        // Skapar kommentarsbox
        var htmlBox = document.createElement("div");
        htmlBox.id = "htmlbox";
        htmlBox.innerHTML = marker.html || "Do write a comment!";
        var textBox = document.createElement("textarea");
        textBox.id = "textbox";
        textBox.innerText = marker.html || "Do write a comment!";
        var editBtn = document.createElement("button");
        editBtn.id = "editBtn";
        editBtn.innerText = "Edit comment";
        var container = document.createElement("div");
        container.id = "infocontainer";
        container.appendChild(htmlBox);
        container.appendChild(textBox);
        container.appendChild(editBtn);
    
    var infoWin = new google.maps.InfoWindow({
        content : container
        });
    
    // Öppnar kommentarsrutan vid klick
    google.maps.event.addListener(marker, 'click', function () {
        infoWin.open(map, marker);
    });
    
    // Ändrar status till edit vid klick 
    google.maps.event.addDomListener(editBtn, "click", function() {
        marker.set("editing", !marker.editing);
    });
    
    // Ändrar kommentarsrutans -och editknappens tillstånd beroende på 
    // om man vill ändra eller spara kommentaren
    google.maps.event.addListener(marker, "editing_changed", function(){
        textBox.style.display = marker.editing ? "block" : "none";
        htmlBox.style.display = marker.editing ? "none" : "block";
        editBtn.innerText = marker.editing ? "Save comment" : "Edit comment";
    });
    
    // Sparar texten i kommentarsrutan
    google.maps.event.addDomListener(textBox, "change", function(){
        htmlBox.innerHTML = textBox.value;
        marker.set("html", textBox.value);
    });
    
    google.maps.event.addListener(marker, "rightclick", function() {
        if (marker.getDraggable()) {
            marker.setMap(null);
        } 
    }); 
    
    var saveButton = document.getElementById("saveButton");
    google.maps.event.addDomListener(saveButton, 'click', function() {
        saveData(marker);
    });
}
        
google.maps.event.addDomListener(window, 'load', initialize);