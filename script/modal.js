"use strict";


var ModalLogin = {
    
    init : function() {
        
        function ModalPopup () {
            
            // Skapar modal popupruta
            var div = document.createElement("div");
            div.className = "background";
            div.id = "bground";
            var modalDiv = document.createElement("div");
            modalDiv.className = "modal";
            modalDiv.id = "modalDiv";
            var buttonLogin = document.createElement("button");
            buttonLogin.id = "btnsignin";
            buttonLogin.textContent = "Sign In";
            var buttonJoin = document.createElement("button");
            buttonJoin.id = "btnjoin";
            buttonJoin.textContent = "Register";
            
            // Skapar textrad i popupen för samtliga fälten
            var wrapper = document.createElement("div");
            wrapper.id = "logincontainer";
            var signinForm = document.createElement("form");
            signinForm.name = "login";
            signinForm.id = "form";
            var emailTag = document.createElement("label");
            emailTag.id = "emailTag";
            emailTag.textContent = "Email";
            var emailInput = document.createElement("input");
            emailInput.id = "email";
            var passwordTag = document.createElement("label");
            passwordTag.id = "passwordTag";
            passwordTag.textContent = "Password";
            var passwordInput = document.createElement("input");
            passwordInput.id = "password";

            // Lägger till alla p-taggar i modala popupen
            wrapper.appendChild(signinForm);
            wrapper.appendChild(emailTag);
            wrapper.appendChild(emailInput);
            wrapper.appendChild(passwordTag);
            wrapper.appendChild(passwordInput);
            wrapper.appendChild(buttonLogin);
            wrapper.appendChild(buttonJoin);
            modalDiv.appendChild(wrapper);
            div.appendChild(modalDiv);
            document.body.appendChild(div);
        
            // Kopplar till händelser för knapparna i modala popupen
            buttonLogin.addEventListener("click", function() {
                doLogin();
            }, false);
            
            buttonJoin.addEventListener("click", function() {
                register();
            }, false);
        }  
        var signin_link = document.getElementById("signin_link");
        var signout_link = document.getElementById("signout_link");
        
        // Kopplar till händelse för signinlänken
        signin_link.addEventListener("click", function() {
            new ModalPopup();
        }, false);
            
        // Kopplar till händelse för signoutinlänken
        signout_link.addEventListener("click", function() {
            signout();
        }, false);
    }
};
window.onload = ModalLogin.init;