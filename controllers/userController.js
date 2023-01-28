"use strict";

const UsersDB = require('../models/UsersDB');
const bcrypt = require('bcrypt'); //library to encrypt password with hash
var jwt = require('jsonwebtoken'); // library for token
var usersDB = new UsersDB();
var secret = "secretkey"; 


function getAllUsers(request,respond){

    usersDB.getAllUsers(function(error, result){

        if(error){

            respond.json(error);

        }

        else{

            respond.json(result);

        }

    });

}



function getUser(request, respond){

    var token = request.body.token;
    
    try {
        var decoded = jwt.verify(token, secret);
        usersDB.getUser(decoded, function (error, result) {
            if (error) {
                respond.json(error);
            }
            else {
                respond.json(result);
            }
        });
        
    } catch (error) {
        respond.json({result:"Invalid Token"});
    }
}

function addUser(request, respond){

    var firstName = request.body.firstName;
    var lastName = request.body.lastName;
    var userName = request.body.userName;
    var profilePic = request.body.profilePic;
    var email = request.body.email;
    var password = request.body.password;  
    password = bcrypt.hashSync(password, 10) // encrypting password using bcrypt library, 
    // password will not be in clear text in database. number 10 dictates how strong the encryption will be
    var contact = request.body.contact;
    var birthday = request.body.birthday;

    usersDB.addUser(firstName, lastName, userName, profilePic, email, password, contact, birthday, function(error, result){
        if (error){
            respond.json(error);
        }

        else{
            respond.json(result);
        }
    });
}

function updateUser(request, respond){

    var firstName = request.body.firstName;
    var lastName = request.body.lastName;
    var profilePic = request.body.profilePic;
    var email = request.body.email;
    var contact = request.body.contact;
    var birthday = request.body.birthday;
    
    var token = request.body.token;
    try {
        var decoded = jwt.verify(token, secret);  // token issued to user when login is needed to update the user details, this line of code to check for the validity of the token with secret key
        usersDB.updateUser(firstName, lastName, profilePic, email, contact, birthday, decoded, function(error, result){
            if (error){
                respond.json(error);
            }
    
            else{
                respond.json(result);
            }
        });
    } catch (error) {
        respond.json({result:"Invalid Token"});
    }

    
}

function deleteUser(request, respond){
    
    var token = request.body.token;
    try {
        var decoded = jwt.verify(token, secret);
        usersDB.deleteUser(decoded, function(error, result){
            if (error){
                respond.json(error);
            }
    
            else{
                respond.json(result);
            }
        });
    } catch (error) {
        respond.json({result:"Invalid Token"});
    }
    
}

function loginUser(request, respond){

    
    var username = request.body.username;
    var password = request.body.password;  
    
    usersDB.loginUser(username, function(error, result){
        if (error){
            respond.json(error);
        }

        else{
            //console.log(result[0].password);
            const hash = result[0].password;  // encrypted password
            var flag = bcrypt.compareSync(password,hash); //comparing clear text password with encrypted password
            if (flag){
                var token = jwt.sign(username, secret); // issuing a token when the details keyed by the user is correct
                respond.json({result:token}); // if flag is true meaning clear text pass matches the encrypted pass
            } else {
                respond.json({result:"Invalid"}); // if flag is false
            }
            
        }
    });
}

function updatePassword(request, respond){

    var password = request.body.password;
    password = bcrypt.hashSync(password, 10) // encrypting password using bcrypt library, 
    // password will not be in clear text in database. number 10 dictates how strong the encryption will be
    var token = request.body.token;

    try {
        var decoded = jwt.verify(token, secret);
        usersDB.updatePassword(password, decoded, function(error, result){
            if (error){
                respond.json(error);
            }

            else {
                respond.json(result);
            }
        });
    } catch (error) {
        respond.json({result:"Invalid Token"});
    }
}


module.exports = {getAllUsers, getUser, addUser, updateUser, deleteUser, loginUser, updatePassword};