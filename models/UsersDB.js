"use strict";

var db = require('../db-connection');

class UsersDB {


    getUser(userName, callback){
        var sql = "SELECT distinct userName, firstName, lastName, profilePic, email, contact, birthday from mydb.user WHERE userName = ?";
        db.query(sql, [userName], callback);
    }

    addUser(firstName, lastName, userName, profilePic, email, password, contact, birthday, callback){
        var sql = "INSERT INTO user (firstName, lastName, userName, profilePic, email, password, contact, birthday) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        db.query(sql, [firstName, lastName, userName, profilePic, email, password, contact, birthday], callback);
    }

    updateUser(firstName, lastName, profilePic, email, contact, birthday, userName, callback){
        var sql = "UPDATE user SET firstName = ?, lastName = ?, profilePic = ?, email= ?, contact = ?, birthday = ? WHERE userName = ?"
        return db.query(sql, [firstName, lastName, profilePic, email, contact, birthday, userName], callback );
    }

    deleteUser(userName, callback){
        var sql = "DELETE from user WHERE userName = ?";
        return db.query(sql, [userName], callback);
    }

    loginUser(userName, callback){
        var sql = "SELECT password from mydb.user WHERE userName = ?";
        db.query(sql, [userName], callback);
    }

    updatePassword(password, userName, callback){
        var sql = "UPDATE user SET password = ? WHERE userName = ?";
        return db.query(sql, [password, userName], callback);
    }

}

module.exports = UsersDB;