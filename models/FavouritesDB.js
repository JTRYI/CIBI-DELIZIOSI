"use strict";

var db = require('../db-connection');

class FavouritesDB{
    
    getUserFavourites(username, callback){
        var sql = "SELECT * FROM favourites, restaurant WHERE restaurant.restaurantName = favourites.restaurant AND username = ?";
        db.query(sql, [username], callback);
    }

    addToFavourites(restaurantID, userID, restaurant, username, callback){
        var sql = "INSERT INTO favourites (restaurantID, userID, restaurant, username) VALUES (?, ?, ?, ?)";
        db.query(sql, [restaurantID, userID, restaurant, username], callback);
    }

    deleteFavourites(restaurantID, username, callback){
        var sql = "DELETE from favourites WHERE restaurantID = ? AND username = ?";
        db.query(sql, [restaurantID, username], callback);
    }

    getNumberOfFavourites(callback){
        var sql = "SELECT restaurant.restaurantName, COUNT(favourites.userID) as Amount_who_favourited FROM favourites RIGHT JOIN restaurant ON favourites.restaurantID = restaurant._id GROUP BY restaurant.restaurantName"
        db.query(sql, callback);
    }
}

module.exports = FavouritesDB;