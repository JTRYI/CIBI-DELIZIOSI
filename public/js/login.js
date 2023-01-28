function loginMe() {

    var loginUser = new XMLHttpRequest();

    loginUser.open("POST", "http://127.0.0.1:8080/login", true);
    loginUser.setRequestHeader("Content-Type", "application/json");
    loginUser.onload = function (){

        $('#loginModal').modal('hide')
        
        var token = JSON.parse(loginUser.responseText); // converting the token which is given by the server side to JSON format as
                                                        // the result is given in string
        console.log(token.result);

        if (token.result != "Invalid") {
            $('#LogSuccessModal').modal('show')
            document.getElementById("registerMenu").style.visibility = "hidden"
            document.getElementById("loginMenu").style.visibility = "hidden"
            document.getElementById("profileMenu").style.visibility = "visible"
            sessionStorage.setItem("token", token.result); // First element in bracket is key, can be any name. second element is value
            location.reload() // refreshes the page  when login so that profile will be added to session storage for loadingProfile.js
        } else {
            $('#LogFailModal').modal('show')
        }
    }

    var username = document.getElementById("UsernameLogin").value;

    var password = document.getElementById("PasswordLogin").value;

    var payload = {username:username, password:password}
    // payload is basically the body in postman

    loginUser.send(JSON.stringify(payload)); //converting the js value into json format 

}