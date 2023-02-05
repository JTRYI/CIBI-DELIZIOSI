function logoutMe(){

    document.getElementById("registerMenu").style.visibility = "visible"
    document.getElementById("loginMenu").style.visibility = "visible"
    document.getElementById("profileMenu").style.visibility = "hidden"
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("profile");
    sessionStorage.removeItem("favList");
    sessionStorage.removeItem("favRestaurant");
}