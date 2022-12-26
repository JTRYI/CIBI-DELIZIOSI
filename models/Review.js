"use strict";
class Review{
constructor(id, restaurant, username, review, reviewRating, timeStamp, userID, restaurantID){
this.id = id;
this.restaurant = restaurant;
this.username = username;
this.review = review;
this.reviewRating = reviewRating;
this.timeStamp = timeStamp
this.userID = userID;
this.restaurantID = restaurantID;

}

getId() {
    return this.id;
}

getRestaurant(){
    return this.restaurant;
}

getUsername(){
    return this.username;
}

getReview(){
    return this.review;
}

getReviewRating(){
    return this.reviewRating;
}

getTimeStamp(){
    return this.timeStamp;
}

getUserId(){
    return this.userID;
}

getRestaurantId(){
    return this.restaurantID;
}

setRestaurant(restaurant){
    this.restaurant = restaurant;
}

setUsername(username){
    this.username = username;
}

setReview(review){
    this.review = review;
}

setReviewRating(reviewRating){
    this.reviewRating = reviewRating;
}

setTimeStamp(timeStamp){
    this.timeStamp = timeStamp;
}

setUserId(userID){
    this.userID = userID;
}

setRestaurantId(restaurantID){
    this.restaurantID = restaurantID;
}

}

module.exports = Review;