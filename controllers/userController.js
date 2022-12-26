"use strict";

const UsersDB = require('../models/UsersDB');
const bcrypt = require('bcrypt'); //library to encrypt password with hash
var jwt = require('jsonwebtoken'); // library for token
var usersDB = new UsersDB();
var secret = "secretkey"; 

function getAllUsers(request, respond){
    usersDB.getAllUsers(function(error, result){
        if (error){
            respond.json(error);
        }

        else{
            respond.json(result);
        }
    });
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
    var userName = request.body.userName;
    var profilePic = request.body.profilePic;
    var email = request.body.email;
    var password = request.body.password;
    password = bcrypt.hashSync(password, 10)

    var contact = request.body.contact;
    var birthday = request.body.birthday;
    var id = request.params.id;
    var token = request.body.token;
    try {
        var decoded = jwt.verify(token, secret);  // token issued to user when login is needed to update the user details, this line of code to check for the validity of the token with secret key
        usersDB.updateUser(firstName, lastName, userName, profilePic, email, password, contact, birthday, id, function(error, result){
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
    var userID = request.params.id
    usersDB.deleteUser(userID, function(error, result){
        if (error){
            respond.json(error);
        }

        else{
            respond.json(result);
        }
    })
}

function loginUser(request, respond){

    
    var email = request.body.email;
    var password = request.body.password;  
    
    usersDB.loginUser(email, function(error, result){
        if (error){
            respond.json(error);
        }

        else{
            //console.log(result[0].password);
            const hash = result[0].password;  // encrypted password
            var flag = bcrypt.compareSync(password,hash); //comparing clear text password with encrypted password
            if (flag){
                var token = jwt.sign(email, secret); // issuing a token when the details keyed by the user is correct
                respond.json({result:token}); // if flag is true meaning clear text pass matches the encrypted pass
            } else {
                respond.json({result:"Invalid"}); // if flag is false
            }
            
        }
    });
}


module.exports = {getAllUsers, addUser, updateUser, deleteUser, loginUser};