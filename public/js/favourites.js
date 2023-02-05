
function getFavouritesData() {

    var get_fav_url = "http://127.0.0.1:8080/favourites" + "/" + sessionStorage.getItem("token");
    var getFav = new XMLHttpRequest();

    getFav.open("GET", get_fav_url, true);
    getFav.setRequestHeader("Content-Type", "application/json");
    getFav.onload = function () {

        favourite_array = JSON.parse(getFav.responseText);
        sessionStorage.setItem('favList', getFav.responseText);
        setFavouriteRestaurants();
        displayFavRestaurants();
    }


    getFav.send();
}

function setFavouriteRestaurants() {
    console.log("clicked");
    let favRestaurants = [];
    let favs = JSON.parse(sessionStorage.getItem('favList'));
    JSON.parse(sessionStorage.getItem('restaurant')).forEach(restaurant => {
        favs.forEach(fav => {
            if (restaurant._id == fav.restaurantID) {
                favRestaurants.push(restaurant);
            }
        })
    })
    sessionStorage.setItem("favRestaurant", JSON.stringify(favRestaurants));
}

function displayFavRestaurants() {
    let fav_restaurant_array = JSON.parse(sessionStorage.getItem('favRestaurant'));
    var table = document.getElementById("favouritesTable");
    table.innerHTML = "";
    var totalFavRestaurants = fav_restaurant_array.length;

    for (var count = 0; count < totalFavRestaurants; count++) {
        var thumbnail = fav_restaurant_array[count].restaurantThumb;
        var title = fav_restaurant_array[count].restaurantName;
        var avgRating = fav_restaurant_array[count].avgRating;
        avgRating = Math.round(avgRating * 10) / 10;
        if (avgRating == 0) {
            avgRating = "NA (No Reviews Yet)"
        }

        var cell = '<div class="card col-md-4 card-restaurant"><img class="card-img-top img-fluid" src="' + thumbnail + '" alt="Card image cap">\
                            <div class="card-body">\<h5 class="card-title" item="' + count + '">' + title + '</h5></div>\
                            <div class = "ratings-section"><label class = "view-ratings">Rating:</label> <span class = "avg-rating">'+ avgRating + ' </span> <i class="fa-solid fa-star custom-front-star"></i> </div>\
                            <div class = "review-section"><label class = "view-reviews">View Reviews</label><i class="far fa-comment fa-lg custom-comment" item="' + count + '"></i> </div>\
                            <div class = "favourites-section"><label class = "add-to-favourites">Remove From Favourites</label><i class="fa-regular fa-heart custom-heart" item="' + count + '" style="float:left;cursor:pointer" onClick = "deleteFavourites(this)"></i> </div>\
                            <div class = "map-section"><label class = "view-map">View Map</label> <i class="fa-solid fa-location-dot custom-map" item="' + count + '" ></i> </div>\
    </div>'
        table.insertAdjacentHTML('beforeend', cell);


    }

}

function deleteFavourites(element){

    let fav_restaurant_array = JSON.parse(sessionStorage.getItem('favRestaurant'));
    var item = element.getAttribute("item");
    currentIndex = item;

    var delete_fav_url = "http://127.0.0.1:8080/favourites" + "/" + fav_restaurant_array[item]._id;

    var delFromFav = new XMLHttpRequest();

    delFromFav.open('DELETE', delete_fav_url, true);
    delFromFav.setRequestHeader("Content-Type", "application/json");
    delFromFav.onload = function () {

        alert("Restaurant removed from favourites!")
        location.reload()
    }


    var payload = {token: sessionStorage.getItem("token")}

    delFromFav.send(JSON.stringify(payload));

}



