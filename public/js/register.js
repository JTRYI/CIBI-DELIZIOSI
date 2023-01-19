
function registerMe() {

    var registerUser = new XMLHttpRequest();

    registerUser.open("POST", "http://127.0.0.1:8080/users", true);
    registerUser.setRequestHeader("Content-Type", "application/json");
    registerUser.onload = function (){

        $('#registerModal').modal('hide')
        $('#successModal').modal('show')
    }

    var firstname = document.getElementById("firstName").value;

    var lastname = document.getElementById("lastName").value;

    var username = document.getElementById("Username").value;

    var password = document.getElementById("Password").value;

    var email = document.getElementById("Email").value;

    var contact = document.getElementById("Contact").value;

    var birthday = document.getElementById("Birthday").value;

    var payload = {firstName:firstname, lastName:lastname, userName:username, email:email, password:password, contact:contact, birthday:birthday}
    // payload is basically the body in postman

    registerUser.send(JSON.stringify(payload)); //converting the js value into json format 

}

