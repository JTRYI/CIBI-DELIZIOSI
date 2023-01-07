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

function getFilteredRestaurants(request, respond){

    var cuisineID = request.params.cuisineID;

    restaurantsDB.getFilteredRestaurants(cuisineID, function(error, result){

        if (error){

            respond.json(error);
        }

        else{
            respond.json(result);
        }
    });
}



module.exports = {getAllRestaurants, getFilteredRestaurants};