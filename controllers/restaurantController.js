"use strict";

const RestaurantsDB = require('../models/RestaurantsDB');



var restaurantsDB = new RestaurantsDB();



function getAllRestaurants(request, respond){

    restaurantsDB.getAllRestaurants(function(error, result){

        if(error){

            respond.json(error);

        }

        else{

            respond.json(result);

        }

    });



}



module.exports = {getAllRestaurants};