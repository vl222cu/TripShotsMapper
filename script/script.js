"use strict";

window.onload = function () {

    var join = document.getElementById("regButton"),
        login = document.getElementById("loginButton");

    // Kopplar till händelse för ImageViewer
    join.addEventListener("click", function () {
        register();
    }, false);
    
    // Kopplar till händelse för RssReader       
    login.addEventListener("click", function () {
        doLogin();
    }, false);