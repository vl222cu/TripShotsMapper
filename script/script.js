"use strict";

window.onload = function () {

    var join = document.getElementById("regButton"),
        login = document.getElementById("loginButton");

    // Kopplar till händelse för registrering
    join.addEventListener("click", function () {
        register();
    }, false);
    
    // Kopplar till händelse för inlogging      
    login.addEventListener("click", function () {
        doLogin();
    }, false);
};