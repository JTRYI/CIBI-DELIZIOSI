"use strict";
const ReviewsDB = require('../models/ReviewsDB');
const Review = require('../models/Review');
var jwt = require('jsonwebtoken'); // library for token
var reviewsDB = new ReviewsDB();
var secret = "secretkey"; 

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

function getSomeReviews(request, respond){
    
    var restaurantID = request.params.restaurantID;

    reviewsDB.getSomeReviews(restaurantID, function(error, result){
        if (error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}

function addReview(request, respond){
    var now = new Date();
    var restaurant = request.body.restaurant;
    var review = request.body.review;
    var reviewRating = request.body.reviewRating;
    var userID = request.body.userID;
    var restaurantID = request.body.restaurantID;
    var token = request.body.token;
    
    try {
        var decoded = jwt.verify(token, secret);
        reviewsDB.addReview(restaurant, decoded, review, reviewRating, now.toString(), userID, restaurantID, function(error, result){
            if(error){
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
    


function updateReview(request, respond){
    var now = new Date();
    var review = request.body.review;
    var reviewRating = request.body.reviewRating;
    var id = request.params.id;
    
    var token = request.body.token;
    try {
        var decoded = jwt.verify(token, secret);
        reviewsDB.updateReview(review, reviewRating, now.toString(), id, decoded, function(error, result){
            if(error){
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

function deleteReview(request, respond){
    var reviewID = request.params.id;
    var token = request.body.token;
    try {
        var decoded = jwt.verify(token, secret);
        reviewsDB.deleteReview(reviewID, decoded, function(error, result){
            if(error){
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

module.exports = {getAllReviews, getSomeReviews, addReview, updateReview, deleteReview};
