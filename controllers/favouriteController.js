"use strict";

const FavouritesDB = require('../models/FavouritesDB');
var jwt = require('jsonwebtoken'); // library for token

var favouritesDB = new FavouritesDB();
var secret = "secretkey";

function getUserFavourites(request, respond){

    var token = request.params.token;

    try {
        var decoded = jwt.verify(token, secret);
        favouritesDB.getUserFavourites(decoded, function(error, result){
            if (error){
                respond.json(error);
            }
    
            else{
                respond.json(result);
            }
        });

    } catch (error) {
        respond.json({result:"Invalid Token"})
    }
    
}

function addToFavourites(request, respond){

    var restaurantID = request.body.restaurantID;
    var token = request.params.token;

    try {
        var decoded = jwt.verify(token, secret);
        favouritesDB.addToFavourites(restaurantID, decoded, function(error, result){
            if (error){
                respond.json(error);
            }
    
            else {
                respond.json(result);
            }
        });
    } catch (error) {
        respond.json({result:"Invalid Token"})
    }
    
}

function deleteFavourites(request, respond){
    var favouriteID = request.params.id;
    var token = request.body.token;

    try {
        var decoded = jwt.verify(token, secret);
        favouritesDB.deleteFavourites(favouriteID, decoded, function(error, result){
            if (error){
                respond.json(error);
            }
    
            else{
                respond.json(result);
            }
        });
    } catch (error) {
        respond.json({result:"Invalid Token"})
    }
    

}

function getNumberOfFavourites(request, respond){
    
    favouritesDB.getNumberOfFavourites(function(error, result){
        if (error){
            respond.json(error);
        }

        else {
            respond.json(result);
        }


    });
}


module.exports = {getUserFavourites, addToFavourites, deleteFavourites, getNumberOfFavourites};