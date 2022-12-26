"use strict";

var db = require('../db-connection');

class UsersDB {

    getAllUsers(callback){
        var sql = "SELECT firstName, lastName, userName, profilePic, email, contact, birthday from mydb.user";
        db.query(sql, callback);
    }

    addUser(firstName, lastName, userName, profilePic, email, password, contact, birthday, callback){
        var sql = "INSERT INTO user (firstName, lastName, userName, profilePic, email, password, contact, birthday) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        db.query(sql, [firstName, lastName, userName, profilePic, email, password, contact, birthday], callback);
    }

    updateUser(firstName, lastName, userName, profilePic, email, password, contact, birthday, id, callback){
        var sql = "UPDATE user SET firstName = ?, lastName = ?, userName = ?, profilePic = ?, email = ?, password = ?, contact = ?, birthday = ? WHERE _id = ?"
        return db.query(sql, [firstName, lastName, userName, profilePic, email, password, contact, birthday, id], callback );
    }

    deleteUser(userID, callback){
        var sql = "DELETE from user WHERE _id = ?";
        return db.query(sql, [userID], callback);
    }

    loginUser(email, callback){
        var sql = "SELECT password from mydb.user WHERE email = ?";
        db.query(sql, [email], callback);
    }

}

module.exports = UsersDB;