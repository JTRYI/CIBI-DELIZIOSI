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
            var avgRating = restaurant_array[count].avgRating;
            avgRating = Math.round(avgRating * 10) / 10;;
            if (avgRating == 0) {
                avgRating = "NA (No Reviews Yet)"
            }
            var cell = '<div class="card col-md-4 card-restaurant"><img class="card-img-top img-fluid" src="' + thumbnail + '" alt="Card image cap">\
                            <div class="card-body">\<h5 style="cursor:pointer" data-toggle="modal" data-target="#restaurantModal" class="card-title" item="' + count + '" onClick="showRestaurantDetails(this)">' + title + '</h5></div>\
                            <div class = "ratings-section"><label class = "view-ratings">Rating:</label> <span class = "avg-rating">'+ avgRating + ' </span> <i class="fa-solid fa-star custom-front-star"></i> </div>\
                            <div class = "review-section"><label class = "view-reviews">View Reviews</label><i class="far fa-comment fa-lg custom-comment" style="float:left;cursor:pointer" data-toggle="modal" data-target="#reviewModal" item="' + count + '" onClick="showRestaurantReviews(this)"></i> </div>\
                            <div class = "favourites-section"><label class = "add-to-favourites">Add to Favourites</label><i class="fa-regular fa-heart custom-heart"></i> </div>\
                            <div class = "map-section"><label class = "view-map">View Map</label> <i class="fa-solid fa-location-dot custom-map" style="float:left;cursor:pointer" data-toggle="modal" data-target="#mapModal" item="' + count + '" onClick = "showMap(this)"></i> </div>\
    </div>'
            table.insertAdjacentHTML('beforeend', cell);

        }

    }

}

// Search function
document.getElementById("searchBtn").addEventListener("click", function(event) {
    event.preventDefault();
    var input = document.getElementById("searchInput").value.toLowerCase();
    var table = document.getElementById("restaurantTable");
    table.innerHTML = "";

    for (var count = 0; count < restaurant_array.length; count++) {
      var title = restaurant_array[count].restaurantName.toLowerCase();
      if (title.includes(input)) {
        var thumbnail = restaurant_array[count].restaurantThumb;
        var title = restaurant_array[count].restaurantName;
        var avgRating = restaurant_array[count].avgRating;
        avgRating = Math.round(avgRating * 10) / 10;;
        if (avgRating == 0) {
            avgRating = "NA (No Reviews Yet)"
        }
        var cell = '<div class="card col-md-4 card-restaurant"><img class="card-img-top img-fluid" src="' + thumbnail + '" alt="Card image cap">\
        <div class="card-body">\<h5 style="cursor:pointer" data-toggle="modal" data-target="#restaurantModal" class="card-title" item="' + count + '" onClick="showRestaurantDetails(this)">' + title + '</h5></div>\
        <div class = "ratings-section"><label class = "view-ratings">Rating:</label> <span class = "avg-rating">'+ avgRating + ' </span> <i class="fa-solid fa-star custom-front-star"></i> </div>\
        <div class = "review-section"><label class = "view-reviews">View Reviews</label><i class="far fa-comment fa-lg custom-comment" style="float:left;cursor:pointer" data-toggle="modal" data-target="#reviewModal" item="' + count + '" onClick="showRestaurantReviews(this)"></i> </div>\
        <div class = "favourites-section"><label class = "add-to-favourites">Add to Favourites</label><i class="fa-regular fa-heart custom-heart"></i> </div>\
        <div class = "map-section"><label class = "view-map">View Map</label> <i class="fa-solid fa-location-dot custom-map" style="float:left;cursor:pointer" data-toggle="modal" data-target="#mapModal" item="' + count + '" onClick = "showMap(this)"></i> </div>\
</div>'
        table.insertAdjacentHTML('beforeend', cell);
      }
    }
  });


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

// Map API
function showMap(element) {
    var item = element.getAttribute("item");
    currentIndex = item;
    var location = [restaurant_array[item].restaurantOutlet, restaurant_array[item].longitude, restaurant_array[item].latitude]
    map = new google.maps.Map(document.getElementById("map"), { center: { lat: 1.8, lng: 110.9 }, zoom: 4 })
    var infowindow = new google.maps.InfoWindow();
    var marker, i;
    var markers = [];

    marker = new google.maps.Marker({
        position: new google.maps.LatLng(location[1], location[2]),
        map: map,
        icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/restaurant.png"
        }
    })
    markers.push(marker);
    google.maps.event.addListener(marker, 'click', (function (marker, i) {
        return function () {
            infowindow.setContent(location[0]);
            infowindow.open(map,marker);
        }
    })(marker, i));
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            }
            map.setCenter(pos);
            map.setZoom(15);
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(pos.lat, pos.lng),
                map: map,
                icon: {
                    url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                }
            });
            markers.push(marker);
            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    infowindow.setContent("Your current location");
                    infowindow.open(map,marker);
                }
            })(marker, i));
        }
    )
}

function listChineseRestaurants() {
    category = "1";
    displayRestaurants(category);
}

function listMalayRestaurants() {

    category = "2";
    displayRestaurants(category);
}

function listIndianRestaurants() {

    category = "3";
    displayRestaurants(category);

}

function listWesternRestaurants() {

    category = "4";
    displayRestaurants(category);

}

function listJapaneseRestaurants() {

    category = "5"
    displayRestaurants(category);

}





