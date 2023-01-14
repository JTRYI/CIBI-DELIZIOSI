"use strict";



var db = require('../db-connection');

class RestaurantsDB{

    getAllRestaurants(callback){

        var sql = "SELECT * from mydb.restaurant";

        db.query(sql, callback);

    }

    getFilteredRestaurants(Type, callback){
        
        var sql = "SELECT restaurant.* FROM restaurant INNER JOIN cuisines ON restaurant.cuisineID = cuisines._id WHERE Type = ?";
        db.query(sql, [Type], callback);
    }

}





module.exports = RestaurantsDB;