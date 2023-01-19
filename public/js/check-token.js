
$(document).ready(function(){

    var token = sessionStorage.getItem("token");
    if (token != null) {
        document.getElementById("registerMenu").style.visibility = "hidden"
        document.getElementById("loginMenu").style.visibility = "hidden"
        document.getElementById("logoutMenu").style.visibility = "visible"
        
    } else {
        
    }

})