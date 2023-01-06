"use strict";

const FavouritesDB = require('../models/FavouritesDB');
var jwt = require('jsonwebtoken'); // library for token

var favouritesDB = new FavouritesDB();

function getAllFavourites(request, respond){
    favouritesDB.getAllFavourites(function(error, result){
        if (error){
            respond.json(error);
        }

        else {
            respond.json(result);
        }
    });
}

function getSomeFavourites(request, respond){

    var userID = request.params.userID

    favouritesDB.getSomeFavourites(userID, function(error, result){
        if (error){
            respond.json(error);
        }

        else{
            respond.json(result);
        }
    });
}

function addToFavourites(request, respond){

    var restaurantID = request.body.restaurantID;
    var userID = request.body.userID;

    favouritesDB.addToFavourites(restaurantID, userID, function(error, result){
        if (error){
            respond.json(error);
        }

        else {
            respond.json(result);
        }
    });
}

function deleteFavourites(request, respond){
    var favouriteID = request.params.id;

    favouritesDB.deleteFavourites(favouriteID, function(error, result){
        if (error){
            respond.json(error);
        }

        else{
            respond.json(result);
        }
    });

}


module.exports = {getAllFavourites, getSomeFavourites, addToFavourites, deleteFavourites};