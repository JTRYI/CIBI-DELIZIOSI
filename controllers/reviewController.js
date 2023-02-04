"use strict";
const ReviewsDB = require('../models/ReviewsDB');
const Review = require('../models/Review');
var jwt = require('jsonwebtoken'); // library for token
var reviewsDB = new ReviewsDB();
var secret = "secretkey";

function getAllReviews(request, respond) {
    reviewsDB.getAllReviews(function (error, result) {
        if (error) {
            respond.json(error);
        }
        else {
            respond.json(result);
        }
    });

}

function addReview(request, respond) {
    var now = new Date();
    var review = new Review(null, request.body.restaurant, request.body.username, request.body.review, request.body.reviewRating, now.toString(), request.body.userID, request.body.restaurantID)


    reviewsDB.addReview(review, function (error, result) {
        if (error) {
            respond.json(error);
        }
        else {
            respond.json(result);
        }
    });


}



function updateReview(request, respond) {
    var now = new Date();
    var review = request.body.review;
    var reviewRating = request.body.reviewRating;
    var id = request.params.id;

    var token = request.body.token;
    try {
        var decoded = jwt.verify(token, secret);
        reviewsDB.updateReview(review, reviewRating, now.toString(), id, decoded, function (error, result) {
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

function deleteReview(request, respond) {
    var reviewID = request.params.id;
    
    try {
        var decoded = jwt.verify(request.body.token, secret);
        reviewsDB.deleteReview(reviewID, decoded, function (error, result) {
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

function averageRating(request, respond){

    var restaurantName = request.body.restaurant;

    reviewsDB.averageRating(restaurantName, function(error,result){
        if (error) {
            respond.json(error);

        } else {

            respond.json(result);
        }
        
    });
}

module.exports = { getAllReviews, addReview, updateReview, deleteReview, averageRating};
