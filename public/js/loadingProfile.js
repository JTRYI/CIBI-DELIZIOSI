$(document).ready(function () {

    var getProfile = new XMLHttpRequest();

    var token;
    token = sessionStorage.getItem("token");

    if (token == null) {
        console.log("User is not login");
    } else {

        getProfile.open("POST", "http://127.0.0.1:8080/member", true);
        getProfile.setRequestHeader("Content-Type", "application/json");
        getProfile.onload = function () {

            var profile = JSON.parse(getProfile.responseText);
            sessionStorage.setItem("profile", JSON.stringify(profile));

            //console.log(getProfile.responseText);
            
        }
    }

    var payload = { token: token };
    getProfile.send(JSON.stringify(payload));

})




