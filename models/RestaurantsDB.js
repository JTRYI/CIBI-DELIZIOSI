"use strict";



var db = require('../db-connection');

class RestaurantsDB{

    getAllRestaurants(callback){

        var sql = "SELECT * from mydb.restaurant";

        db.query(sql, callback);

    }

}



module.exports = RestaurantsDB;