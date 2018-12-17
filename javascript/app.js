var map, searchManager;

var latitude, longitude;

// zip code to be grabbed from <html>
// example zip here
var queryURL = 'http://api.ipstack.com/192.5.110.7?access_key=95751cb0a919156ee8a1114a5177565a';
    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
        console.log(response);
        var zip = response.zip;
        latitude = response.latitude;
        console.log(latitude);
        longitude = response.longitude;
        console.log(longitude);
    });


var zip = 44236;


function GetMap() {
    map = new Microsoft.Maps.Map('#myMap', {
        credentials: "Auv1Og25-4VdEUdvHA2_Vaef_u1C3RW9f0o28hOZDVXIzP0W3yIpbuBqMkmDqT-Z"
    });

    //Make a request to geocode the zip.
    geocodeQuery(zip);
}

function geocodeQuery(query) {
    //If search manager is not defined, load the search module.
    if (!searchManager) {
        //Create an instance of the search manager and call the geocodeQuery function again.
        Microsoft.Maps.loadModule('Microsoft.Maps.Search', function () {
            searchManager = new Microsoft.Maps.Search.SearchManager(map);
            geocodeQuery(query);
        });
    } else {
        var searchRequest = {
            where: query,
            callback: function (r) {
                //Add the first result to the map and zoom into it.
                if (r && r.results && r.results.length > 0) {
                    var pin = new Microsoft.Maps.Pushpin(r.results[0].location);
                    map.entities.push(pin);

                    map.setView({ bounds: r.results[0].bestView });
                }
            },
            errorCallback: function (e) {
                //If there is an error, alert the user about it.
                alert("No results found.");
            }
        };

        //Make the geocode request.
        searchManager.geocode(searchRequest);
        console.log(searchRequest);
    }
}

// edamam api for looking up food
// food-lookup API

var food = "burrito";
var app_id = "9234fec9";
var app_key = "1f15e7565e2265645897bc8370a1122b";
var queryURL = 'https://api.edamam.com/api/food-database/parser?ingr=' + food + '&app_id='+ app_id + '&app_key=' + app_key + '';
    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
        console.log(response);
    });

// zomato menu lookup API

var res_id = "16507624";
var user_key = "5a7e60e0cd1390fa635ea4117a269d9a";
var queryURL = "https://developers.zomato.com/api/v2.1/dailymenu?res_id=" + res_id + "";
$.ajax({
    url: queryURL,
    method: "GET",
    beforeSend: function(xhr){xhr.setRequestHeader('user-key', '5a7e60e0cd1390fa635ea4117a269d9a');},
    }).then(function(response) {
        console.log(response);
    });






    $("#submit-button").on("click", function() {
        zip = $("#zip-input").val();
        geocodeQuery(zip);
        console.log(zip);
    });


latitude = 41.5084;
longitude = -81.6076;


var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=pizza&latitude=" + latitude + "&longitude=" + longitude;

$.ajax({
    url: queryURL,
    headers: {
        'Authorization': 'Bearer w3KC3brKFhrPWf7IUuN5SCc3KIMXj1CfkgHE4Wv56Mot7VJTIWOSAuBS2gfnL6fhC_Xh-TQMK1hB_w0t3hJkMTJSmrLRzLEVlnvVo18ecPgJnAk_jYg_G4f8rTwVXHYx',
    },
    method: "GET",
    dataType: "json"
}).then(function(response) { 
    console.log(response);
});

 ////Modal functions////
 var modal = document.getElementById('myModal');

 // Get the button that opens the modal
 var btn = document.getElementById("myBtn");
 
 // Get the <span> element that closes the modal
 var span = document.getElementsByClassName("close")[0];
 
 // When the user clicks on the button, open the modal 
 btn.onclick = function() {
   modal.style.display = "block";
 }
 
 // When the user clicks on <span> (x), close the modal
 span.onclick = function() {
   modal.style.display = "none";
 }
 
 // When the user clicks anywhere outside of the modal, close it
 window.onclick = function(event) {
   if (event.target == modal) {
     modal.style.display = "none";
   }
 }