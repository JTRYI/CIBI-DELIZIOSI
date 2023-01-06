"use strict";

var db = require('../db-connection');

class ReviewsDB{
    getAllReviews(callback){
        var sql = "SELECT * from mydb.review";
        db.query(sql, callback);
    }

    getSomeReviews(restaurantID, callback){
        var sql = "SELECT * from mydb.review WHERE restaurantID = ?"
        db.query(sql, [restaurantID] , callback);
    }

    addReview(restaurant, username, review, reviewRating, timeStamp, userID, restaurantID, callback){
        var sql = "INSERT INTO review (restaurant, username, review, reviewRating, timeStamp, userID, restaurantID) VALUES (?, ?, ?, ?, ?, ?, ?)";  
        db.query(sql, [restaurant, username, review, reviewRating, timeStamp, userID, restaurantID], callback);
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