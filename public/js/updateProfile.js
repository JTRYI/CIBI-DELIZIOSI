function encode(){

    var selectedfile = document.getElementById("myinput").files;
    if (selectedfile.length > 0 ){
        var imageFile = selectedfile[0];
        var fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent){
            picture = fileLoadedEvent.target.result;
            document.getElementById("target").src = picture;
        }
        fileReader.readAsDataURL(imageFile);
    }

}

function updateMe(){

    // do ctrl + shift + L to select all the variables with the same name if want to change all 
    var updateUser = new XMLHttpRequest();

    updateUser.open("PUT", "http://127.0.0.1:8080/users", true);
    updateUser.setRequestHeader("Content-Type", "application/json");
    updateUser.onload = function (){

        alert("Update Successful!");

            
        }
    
    firstName = document.getElementById("firstNameUp").value;
    lastName = document.getElementById("lastNameUp").value;
    email = document.getElementById("EmailUp").value;
    contact = document.getElementById("ContactUp").value;
    birthday = document.getElementById("BirthdayUp").value;

    var token = sessionStorage.getItem("token");

    var payload = {firstName:firstName, lastName:lastName, profilePic:picture, email: email, contact:contact, birthday:birthday, token:token};
    // payload is basically the body in postman

    
    updateUser.send(JSON.stringify(payload)); //converting the js value into json format 


}