function fetchReviews() {
    var request = new XMLHttpRequest();

    request.open('GET', review_url, true);

    //This command starts the calling of the reviews api
    request.onload = function () {
        //get all the reviews records into our reviews array
        review_array = JSON.parse(request.responseText);
        sessionStorage.setItem("reviews", JSON.stringify(review_array));
        console.log(review_array);
    };

    request.send();
}

//This function is to display all the reviews of that restaurant
//whenever the user click on the "comment" button
function showRestaurantReviews(element) {

    document.getElementById("emptyReview").innerHTML = "No review yet. Create one now";
    var item = element.getAttribute("item");
    currentIndex = item;
    document.getElementById("review").textContent = "Review for " + restaurant_array[item].restaurantName;
    document.getElementById("reviewBody").textContent = "";

    for (var i = 0; i < review_array.length; i++) {
        if (review_array[i].restaurant === restaurant_array[item].restaurantName) {
            document.getElementById("emptyReview").innerHTML = "";
            selectedRestaurantId = restaurant_array[item]._id;
            star = "";
            var html = '<div class="text-center" style="width:100%;">                                                           \
                            <div class="card">                                                                                  \
                                <div class="card-body">                                                                         \
                                    <p class="card-text" id="rating' + i + '">' + review_array[i].review + "</p>               \
                                    <small>by " + review_array[i].username + " @ " + review_array[i].timeStamp + "</small>   \
                                </div>                                                                                          \
                            </div>                                                                                              \
                        </div>";
            document.getElementById("reviewBody").insertAdjacentHTML('beforeend', html);

            var star = "";
            for (var j = 0; j < review_array[i].reviewRating; j++) {
                console.log(i);
                star += "<img src='images/popcorn.png' style='width:50px' />";
            }
            star += "<i class='far fa-trash-alt fa-2x edit custom-bin' data-dismiss='modal' item='" + i + "' onClick='deleteReview(this)' ></i>";
            star += "<i class='far fa-edit fa-2x edit custom-edit' data-toggle='modal' data-target='#editReviewModal' data-dismiss='modal' item='" + i + "' onClick='editReview(this)' ></i>";
            document.getElementById("rating" + i).insertAdjacentHTML('beforebegin', star + "<br/>");
        }
    }
}

function newReview() {

    //Initialise each HTML input elements in the modal window with default value.
    var backButton = document.getElementById("newReview")
    var token = sessionStorage.getItem("token");
    var profile = JSON.parse(sessionStorage.getItem("profile"))


    if (token != null) {
        username = profile[0].userName
        rating = 0;
        document.getElementById("nickname").value = username;
        document.getElementById("userComments").value = "";

        backButton.dataset.target = "#newReviewModal"
    }

    else {
        alert("Please login to add reviews!")
        backButton.dataset.target = "#";
    }

}

// Submit or send the new review to the server to be added.
function addReview() {

    var review = new Object();
    review.restaurant = restaurant_array[currentIndex].restaurantName; // Restaurant name is required by server to create new review
    review.username = document.getElementById("nickname").value; // Value from HTML input text
    review.review = document.getElementById("userComments").value; // Value from HTML input text
    review.reviewRating = rating;
    review.timeStamp = null;
    review.restaurantID = restaurant_array[currentIndex]._id;

    var postReview = new XMLHttpRequest(); // new HttpRequest instance to send comment

    postReview.open("POST", review_url, true); //Use the HTTP POST method to send data to server

    postReview.setRequestHeader("Content-Type", "application/json");
    postReview.onload = function () {
        console.log("New review sent");
        fetchReviews(); // fetch all comments again so that the web page can have updated comments.
        location.reload();     
    };

    postReview.send(JSON.stringify(review));
}

//This function allows the user to mouse hover the black and white popcorn
//so that it will turn to a colored version when hovered
function rateIt(element) {
    var num = element.getAttribute("value");
    var classname = element.getAttribute("class");
    var popcorns = document.getElementsByClassName(classname);
    var classTarget = "." + classname;

    // This is another way of writing 'for' loop, which initialises the 
    // popcorn images to use black and white.
    for (let popcorn of popcorns) {
        popcorn.setAttribute("src", popcornBWImage);
    }
    changePopcornImage(num, classTarget);
}

// This function sets the rating and coloured images based on the value of the image tag when  
// the mouse cursor hovers over the popcorn image.
function changePopcornImage(num, classTarget) {
    switch (eval(num)) {
        case 1:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", popcornImage);
            rating = 1;
            break;
        case 2:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", popcornImage);
            rating = 2;
            break;
        case 3:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", popcornImage);
            rating = 3;
            break;
        case 4:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='4']").setAttribute("src", popcornImage);
            rating = 4;
            break;
        case 5:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='4']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='5']").setAttribute("src", popcornImage);
            rating = 5;
            break;
    }
}




//This function displays the correct number of colored popcorn
//based on the restaurant rating that is given in the user comment
function displayColorPopcorn(classname, num) {
    var pop = document.getElementsByClassName(classname);
    var classTarget = "." + classname;
    for (let p of pop) {
        p.setAttribute("src", popcornBWImage);
    }
    changePopcornImage(num, classTarget);
}

//This function will hide the existing modal and present a modal with the selected comment
//so that the user can attempt to change the username, rating or movie review
function editReview(element) {

    var item = element.getAttribute("item");
    currentIndex = item;
    
    document.getElementById("editnickname").value = review_array[item].username;
    document.getElementById("edituserComments").value = review_array[item].review;
    console.log(review_array[item].reviewRating);
    displayColorPopcorn('editpop', review_array[item].reviewRating);

}


//This function sends the review data to the server for updating
function updateReview() {
    var response = confirm("Are you sure you want to update this comment?");
    if (response == true) {
        var edit_review_url = review_url + "/" + review_array[currentIndex]._id;
        var updateReview = new XMLHttpRequest(); // new HttpRequest instance to send request to server
        updateReview.open("PUT", edit_review_url, true); //The HTTP method called 'PUT' is used here as we are updating data
        updateReview.setRequestHeader("Content-Type", "application/json");
        review_array[currentIndex].review = document.getElementById("edituserComments").value;
        review_array[currentIndex].reviewRating = rating;
        updateReview.onload = function () {
            fetchReviews();
            location.reload()
        };
        updateReview.send(JSON.stringify({
            review: document.getElementById('edituserComments').value,
            reviewRating: rating,
            token: sessionStorage.getItem("token")

        }));
    }
}

//This function deletes the selected comment in a specific restaurant
function deleteReview(element) {
    var response = confirm("Are you sure you want to delete this comment?");

    if (response == true) {
        var item = element.getAttribute("item"); //get the current item
        var delete_review_url = review_url + "/" + review_array[item]._id;
        var eraseReview = new XMLHttpRequest();
        eraseReview.open("DELETE", delete_review_url, true);
        eraseReview.setRequestHeader("Content-Type", "application/json");
        eraseReview.onload = function () {
            fetchReviews();
            location.reload()
        };

        eraseReview.send(JSON.stringify({
            token: sessionStorage.getItem("token")
        }));
    }
}
