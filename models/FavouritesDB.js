"use strict";

var db = require('../db-connection');

class FavouritesDB{
    getAllFavourites(callback){
        var sql = "SELECT * from mydb.favourites";
        db.query(sql, callback);
    }

    getSomeFavourites(username, callback){
        var sql = "SELECT * from mydb.favourites WHERE username = ?";
        db.query(sql, [username], callback);
    }

    addToFavourites(restaurantID, userID, username, callback){
        var sql = "INSERT INTO favourites (restaurantID, userID, username) VALUES (?, ?, ?)";
        db.query(sql, [restaurantID, userID, username], callback);
    }

    deleteFavourites(favouriteID, username, callback){
        var sql = "DELETE from favourites WHERE _id = ? AND username = ?";
        db.query(sql, [favouriteID, username], callback);
    }
}

module.exports = FavouritesDB;