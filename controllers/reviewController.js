"use strict";
const ReviewsDB = require('../models/ReviewsDB');
const Review = require('../models/Review');

var reviewsDB = new ReviewsDB();

function getAllReviews(request, respond){
    reviewsDB.getAllReviews(function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });

}

function addReview(request, respond){
    var now = new Date();
    var review = new Review(null, request.body.restaurant, request.body.username, request.body.review, request.body.reviewRating, now.toString(), request.body.userID, request.body.restaurantID);
    reviewsDB.addReview(review, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    })
}

function updateReview(request, respond){
    var now = new Date();
    var review = new Review(parseInt(request.params.id), request.body.restaurant, request.body.username, request.body.review, request.body.reviewRating, now.toString(), request.body.userID, request.body.restaurantID);
    reviewsDB.updateReview(review, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}

function deleteReview(request, respond){
    var reviewID = request.params.id;
    reviewsDB.deleteReview(reviewID, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}

module.exports = {getAllReviews, addReview, updateReview, deleteReview};
