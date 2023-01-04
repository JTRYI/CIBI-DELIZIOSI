"use strict";

var db = require('../db-connection');

class FavouritesDB{
    getAllFavourites(callback){
        var sql = "SELECT * from mydb.favourites";
        db.query(sql, callback);
    }

    getSomeFavourites(userID, callback){
        var sql = "SELECT * from mydb.favourites WHERE userID = ?";
        db.query(sql, [userID], callback);
    }

    addToFavourites(restaurantID, userID, callback){
        var sql = "INSERT INTO favourites (restaurantID, userID) VALUES (?, ?)";
        db.query(sql, [restaurantID, userID], callback);
    }

    deleteFavourites(favouriteID, callback){
        var sql = "DELETE from favourites WHERE _id = ?";
        db.query(sql, [favouriteID], callback);
    }
}

module.exports = FavouritesDB;