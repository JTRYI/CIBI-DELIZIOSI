$(document).ready(function(){
    
    var token = sessionStorage.getItem("token");
    if (token != null) {
        document.getElementById("registerMenu").style.visibility = "hidden";
        document.getElementById("loginMenu").style.visibility = "hidden";
        document.getElementById("profileMenu").style.visibility = "visible";
        
    } else {
        window.location.href = "index.html";
    }

})