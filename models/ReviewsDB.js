"use strict";

var db = require('../db-connection');

class ReviewsDB{
    getAllReviews(callback){
        var sql = "SELECT * from mydb.review";
        db.query(sql, callback);
    }

    addReview(review, callback){
        var sql = "INSERT INTO review (restaurant, username, review, reviewRating, timeStamp, userID, restaurantID) VALUES (?, ?, ?, ?, ?, ?, ?)";  
        db.query(sql, [review.getRestaurant().trim(), review.getUsername(), review.getReview(), review.getReviewRating(), review.getTimeStamp(), review.getUserId(), review.getRestaurantId()], callback);
    }

    updateReview(review, callback){
        var sql = "UPDATE review SET review = ?, reviewRating = ?, timeStamp = ? WHERE _id = ? "
        return db.query(sql, [review.getReview(), review.getReviewRating(), review.getTimeStamp(), review.getId()], callback);
    }

    deleteReview(reviewID, callback){
        var sql = "DELETE from review WHERE _id = ?";
        return db.query(sql, [reviewID], callback);
    }

}

module.exports = ReviewsDB;