"use strict";

var db = require('../db-connection');

class ReviewsDB{
    getAllReviews(callback){
        var sql = "SELECT * from mydb.review";
        db.query(sql, callback);
    }

    addReview(review, callback){
        var sql = "INSERT INTO review (restaurant, username, review, reviewRating, timeStamp, userID, restaurantID) VALUES (?, ?, ?, ?, ?, ?, ?)";  
        db.query(sql, [review.getRestaurant(), review.getUsername(), review.getReview(), review.getReviewRating(), review.getTimeStamp(), review.getUserId(), review.getRestaurantId()], callback);
    }

    updateReview(review, reviewRating, timeStamp, id, username, callback){
        var sql = "UPDATE review SET review = ?, reviewRating = ?, timeStamp = ? WHERE _id = ? AND username = ?"
        return db.query(sql, [review, reviewRating, timeStamp, id, username], callback);
    }

    deleteReview(reviewID, username, callback){
        var sql = "DELETE from review WHERE _id = ? AND username = ? ";
        return db.query(sql, [reviewID, username], callback);
    }

}

module.exports = ReviewsDB;