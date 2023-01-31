//This function is to call the restaurants api and get all the restaurants

function getRestaurantData() {
    var request = new XMLHttpRequest();
    request.open('GET', restaurant_url, true);
    //This function will be called when data returns from the web api    
    request.onload = function () {
        //get all the restaurant records into our restaurant array        
        restaurant_array = JSON.parse(request.responseText);
        sessionStorage.setItem("restaurant", JSON.stringify(restaurant_array));
        //Fetch the reviews as well        
        fetchReviews();
        console.log(restaurant_array) // output to console        
        //call the function so as to display all movies tiles for "Now Showing"        	
        displayRestaurants(category);
        //Fetch the users as well
        fetchUsers();

    };

    //This command starts the calling of the restaurants web api    
    request.send();
}

function fetchUsers() {

    var fetchAllUser = new XMLHttpRequest();

    fetchAllUser.open('GET', 'http://127.0.0.1:8080/users', true);

    fetchAllUser.onload = function () {

        user_array = JSON.parse(fetchAllUser.responseText);
        //sessionStorage.setItem("users", JSON.stringify(user_array));
        //console.log(user_array)

    }

    fetchAllUser.send();
}


function displayRestaurants(category) {
    var table = document.getElementById("restaurantTable");

    table.innerHTML = "";
    totalRestaurants = restaurant_array.length;


    for (var count = 0; count < totalRestaurants; count++) {
        if (restaurant_array[count].cuisineID == category) {

            var thumbnail = restaurant_array[count].restaurantThumb;
            var title = restaurant_array[count].restaurantName;
            var cell = '<div class="card col-md-4 card-restaurant"><img class="card-img-top img-fluid" src="' + thumbnail + '" alt="Card image cap">\
                            <div class="card-body">\<h5 style="cursor:pointer" data-toggle="modal" data-target="#restaurantModal" class="card-title" item="' + count + '" onClick="showRestaurantDetails(this)">' + title + '</h5></div>\
                            <div class = "ratings-section"><label class = "view-ratings">Rating:</label></div>\
                            <div class = "review-section"><label class = "view-reviews">View Reviews</label><i class="far fa-comment fa-lg custom-comment" style="float:left;cursor:pointer" data-toggle="modal" data-target="#reviewModal" item="' + count + '" onClick="showRestaurantReviews(this)"></i> </div>\
                            <div class = "favourites-section"><label class = "add-to-favourites">Add to Favourites</label><i class="fa-regular fa-heart custom-heart"></i>\
    </div>'
            table.insertAdjacentHTML('beforeend', cell);

        }

    }
}


function showRestaurantDetails(element) {
    var item = element.getAttribute("item");
    currentIndex = item;
    document.getElementById("restaurantName").textContent = restaurant_array[item].restaurantName;
    document.getElementById("restaurantImg").src = restaurant_array[item].restaurantImg;
    document.getElementById("Outlet").textContent = restaurant_array[item].restaurantOutlet;
    document.getElementById("Address").textContent = restaurant_array[item].restaurantAddress;
    document.getElementById("OperatingHours").textContent = restaurant_array[item].restaurantOperatingHours;
    document.getElementById("contact").textContent = restaurant_array[item].restaurantContact;
    document.getElementById("WebLink").textContent = restaurant_array[item].restaurantWebLink;
    document.getElementById("Description").textContent = restaurant_array[item].restaurantDescription;


}

function listChineseRestaurants(){
    category = "1";
    displayRestaurants(category);
}

function listMalayRestaurants(){

    category = "2";
    displayRestaurants(category);
}

function listIndianRestaurants(){

    category = "3";
    displayRestaurants(category);

}

function listWesternRestaurants(){

    category = "4";
    displayRestaurants(category);

}

function listJapaneseRestaurants(){

    category = "5"
    displayRestaurants(category);

}


