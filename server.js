var express = require("express"); //using the express web framework

var favouriteController = require('./controllers/favouriteController')
var userController = require('./controllers/userController');
var reviewController = require('./controllers/reviewController');
var restaurantController = require('./controllers/restaurantController'); // set restaurantController to the restaurantController class
var app = express(); // set variable app to be an instance of express framework. From now on, app is the express

app.use(express.static("./public")); //static files are to be served from the public folder - for eg. html, images, css
app.use(express.json()); // json() is a method inbuilt in express to recognize the incoming Request Object from the web client as a JSON Object.
// In time to come we will need to accept new or edited comments from user

// routes for restaurants
app.route('/restaurants').get(restaurantController.getAllRestaurants); // activate the getAllRestaurants method if the route is GET(method) /restaurants

// routes for reviews
app.route('/reviews').get(reviewController.getAllReviews); // activate the getAllReviews method if the route is GET(method) /reviews
app.route('/reviews').post(reviewController.addReview); // activate the addReview method if the route is POST(method) /reviews
app.route('/reviews/:id').put(reviewController.updateReview); // activate the updateReview method if the route is PUT(method)  /reviews/:id
app.route('/reviews/:id').delete(reviewController.deleteReview); // activate the deleteReview method if the route is DELETE(method) /reviews/:id

// routes for users
app.route('/users').get(userController.getAllUsers); // Retrieving all users
app.route('/users').post(userController.addUser);    // Registering user
app.route('/users/:id').put(userController.updateUser);  // Updating user details
app.route('/users/:id').delete(userController.deleteUser);   // Deleting user account
app.route('/login').post(userController.loginUser);    // User login

// routes for favourites
app.route('/favourites').get(favouriteController.getAllFavourites); // Retrieving all favourites
app.route('/favourites').post(favouriteController.addToFavourites); // Add restaurant to favourites
app.route('/favourites/:id').delete(favouriteController.deleteFavourites); // deleting restaurant from favourite


app.listen(8080, "127.0.0.1"); // start the nodejs to be listening for incoming request @ port 8080
console.log("web server running @ http://127.0.0.1:8080"); // output to console 