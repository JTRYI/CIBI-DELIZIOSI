function sendEmail() {

    var emailUser = new XMLHttpRequest();

    emailUser.open("POST", "http://127.0.0.1:8080/email", true);
    emailUser.setRequestHeader("Content-Type", "application/json");
    emailUser.onload = function (){

        
        var emailResponse = JSON.parse(emailUser.responseText); // converting the email response which is given by the server side to a JSON object
                                                        
        console.log(emailResponse.result);

        if (emailResponse.result == "Success!") {
            
            alert("Feedback Successful!")

        } else {
            
            alert("Feedback Unsuccessful!")
        }
    }

    var email = document.getElementById("contactEmail").value;

    var content = document.getElementById("contactComments").value;

    var payload = {email:email, content:content}
    // payload is basically the body in postman

    emailUser.send(JSON.stringify(payload)); //converting the js value into json format 

}