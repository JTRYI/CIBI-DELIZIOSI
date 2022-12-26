"use strict";

const UsersDB = require('../models/UsersDB');
const User = require('../models/User');

var usersDB = new UsersDB();

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
    var contact = request.body.contact;
    var birthday = request.body.birthday;

    usersDB.updateUser(firstName, lastName, userName, profilePic, email, password, contact, birthday, function(error, result){
        if (error){
            respond.json(error);
        }

        else{
            respond.json(result);
        }
    });
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

module.exports = {getAllUsers, addUser, updateUser, deleteUser};