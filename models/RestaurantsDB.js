"use strict";



var db = require('../db-connection');

class RestaurantsDB{

    getAllRestaurants(callback){

        var sql = "SELECT restaurant.*, AVG(review.reviewRating) AS avgRating FROM restaurant LEFT JOIN review ON restaurant._id = review.restaurantID GROUP BY restaurant._id";

        db.query(sql, callback);

    }

    getFilteredRestaurants(Type, callback){
        
        var sql = "SELECT restaurant.*, cuisines.Type FROM restaurant INNER JOIN cuisines ON restaurant.cuisineID = cuisines._id WHERE Type = ?";
        db.query(sql, [Type], callback);
    }

}





module.exports = RestaurantsDB;