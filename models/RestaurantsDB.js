"use strict";



var db = require('../db-connection');

class RestaurantsDB{

    getAllRestaurants(callback){

        var sql = "SELECT * from mydb.restaurant";

        db.query(sql, callback);

    }

    getFilteredRestaurants(cuisineID, callback){
        
        var sql = "SELECT * from mydb.restaurant WHERE cuisineID = ?";
        db.query(sql, [cuisineID], callback);
    }

}





module.exports = RestaurantsDB;