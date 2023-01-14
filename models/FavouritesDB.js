"use strict";

var db = require('../db-connection');

class FavouritesDB{
    
    getUserFavourites(username, callback){
        var sql = "SELECT favourites.restaurantID FROM favourites LEFT JOIN user ON favourites.userID = user._id WHERE user.userName = ?";
        db.query(sql, [username], callback);
    }

    addToFavourites(restaurantID, username, callback){
        var sql = "INSERT INTO favourites (restaurantID, userID) SELECT ?, user._id FROM user WHERE user.userName = ?";
        db.query(sql, [restaurantID, username], callback);
    }

    deleteFavourites(favouriteID, username, callback){
        var sql = "DELETE from favourites WHERE _id = ? AND userID = (SELECT user._id FROM user WHERE user.userName = ?)";
        db.query(sql, [favouriteID, username], callback);
    }

    getNumberOfFavourites(callback){
        var sql = "SELECT restaurant.restaurantName, COUNT(favourites.userID) as Amount_who_favourited FROM favourites RIGHT JOIN restaurant ON favourites.restaurantID = restaurant._id GROUP BY restaurant.restaurantName"
        db.query(sql, callback);
    }
}

module.exports = FavouritesDB;