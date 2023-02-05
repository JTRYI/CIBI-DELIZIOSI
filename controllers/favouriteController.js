"use strict";

const FavouritesDB = require('../models/FavouritesDB');
var jwt = require('jsonwebtoken'); // library for token

var favouritesDB = new FavouritesDB();
var secret = "secretkey";

function getUserFavourites(request, respond) {

    var token = request.params.token;

    try {
        var decoded = jwt.verify(token, secret);
        favouritesDB.getUserFavourites(decoded, function (error, result) {
            if (error) {
                respond.json(error);
            }

            else {
                respond.json(result);
            }
        });

    } catch (error) {
        respond.json({ result: "Invalid Token" })
    }

}

function addToFavourites(request, respond) {

    var restaurantID = request.body.restaurantID;
    var userID = request.body.userID;
    var restaurant = request.body.restaurant;
    var username = request.body.username;


    favouritesDB.addToFavourites(restaurantID, userID, restaurant, username, function (error, result) {
        if (error) {
            respond.json(error);
        }

        else {
            respond.json(result);
        }
    });
}



function deleteFavourites(request, respond) {
    var restaurantID = request.params.id;
    var token = request.body.token;

    try {
        var decoded = jwt.verify(token, secret);
        favouritesDB.deleteFavourites(restaurantID, decoded, function (error, result) {
            if (error) {
                respond.json(error);
            }

            else {
                respond.json(result);
            }
        });
    } catch (error) {
        respond.json({ result: "Invalid Token" })
    }


}

function getNumberOfFavourites(request, respond) {

    favouritesDB.getNumberOfFavourites(function (error, result) {
        if (error) {
            respond.json(error);
        }

        else {
            respond.json(result);
        }


    });
}


module.exports = { getUserFavourites, addToFavourites, deleteFavourites, getNumberOfFavourites };