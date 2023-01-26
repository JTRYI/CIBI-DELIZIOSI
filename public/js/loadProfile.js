$(document).ready(function(){

    var getProfile = new XMLHttpRequest();

    getProfile.open("POST", "http://127.0.0.1:8080/member", true);
    getProfile.setRequestHeader("Content-Type","application/json");
    getProfile.onload = function(){

        var profile = JSON.parse(getProfile.responseText);
        //console.log(getProfile.responseText);
        picture = profile[0].profilePic;
        firstName = profile[0].firstName;
        lastName = profile[0].lastName;
        email = profile[0].email;
        contact = profile[0].contact;
        birthday = profile[0].birthday;
        userName = profile[0].userName;

        document.getElementById("firstNameUp").value = firstName;
        document.getElementById("lastNameUp").value = lastName;
        document.getElementById("EmailUp").value = email;
        document.getElementById("ContactUp").value = contact;
        document.getElementById("BirthdayUp").value = birthday;
        
        if (picture == null) {

            document.getElementById("target").src = "images/avatar.png"; // if picture is null put default avatar as the picture

        } else {

            document.getElementById("target").src = picture; // if user already have picture set it to the same picture
        }
    }

    var payload = {token: token};
    getProfile.send(JSON.stringify(payload));
})