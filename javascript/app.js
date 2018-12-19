$("#submit-button").on("click", function() {
    var zipcode = $("#zip-input").val().trim();
    var food = $("#food-input").val().trim();




var latitude, longitude;

var queryURL = 'https://cors-anywhere.herokuapp.com/https://www.zipcodeapi.com/rest/0rOl7hMQcxZH79DDu2OthcjhqPDWttWMEtqM1X5IOfuAconQ1SbYjVrgOsR7m7hr/info.json/'+ zipcode + '/degrees';
 
$.ajax({
    url: queryURL,
    headers: {
        'Authorization': 'Bearer w3KC3brKFhrPWf7IUuN5SCc3KIMXj1CfkgHE4Wv56Mot7VJTIWOSAuBS2gfnL6fhC_Xh-TQMK1hB_w0t3hJkMTJSmrLRzLEVlnvVo18ecPgJnAk_jYg_G4f8rTwVXHYx',
    },
    method: "GET",
    dataType: "json"
    }).then(function(response) {
        console.log(response);
        latitude = response.lat;
        longitude = response.lng;

        var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=" + food + "&latitude=" + latitude + "&longitude=" + longitude;

$.ajax({
    url: queryURL,
    headers: {
        'Authorization': 'Bearer w3KC3brKFhrPWf7IUuN5SCc3KIMXj1CfkgHE4Wv56Mot7VJTIWOSAuBS2gfnL6fhC_Xh-TQMK1hB_w0t3hJkMTJSmrLRzLEVlnvVo18ecPgJnAk_jYg_G4f8rTwVXHYx',
    },
    method: "GET",
    dataType: "json"
}).then(function(response) { 
    console.log(response);
    latitude = response.businesses[1].coordinates.latitude;
    longitude = response.businesses[1].coordinates.longitude;
    latitudes = [];
    longitudes = [];
    businessNames = [];
    var address0 = [];
    var address1 = [];
    var phone = [];
    var website = [];
    for (i=0; i < response.businesses.length; i++) {
        latitudes[i] = response.businesses[i].coordinates.latitude;
        longitudes[i] = response.businesses[i].coordinates.longitude;
        businessNames[i] = response.businesses[i].name;
        address0[i] = response.businesses[i].location.display_address[0];
        address1[i] = response.businesses[i].location.display_address[1];
        phone[i] = response.businesses[i].display_phone;
        website[i] = response.businesses[i].url;

        $("#list").append(
            '<div class="card" style="width: 18rem;">' + 
            '<div class="card-body">' + 
                '<h5 class="card-title">'+ (i+1) + '. ' + businessNames[i] + '</h5>' + 
                '<h6 class="card-subtitle mb-2 text-muted">' + address0[i] + '</h6>' + 
                '<h6 class="card-subtitle mb-2 text-muted">' + address1[i] + '</h6>' + 
                '<h6 class="card-text">' + phone[i] + '</h6>' +
                '<a href="'+ website[i] + '" class="card-link">WEBSITE</a>' + 
            '</div>' + 
            '</div>'
        );
       /* $('.card').plate();
$('.card').plate({

    // inverse animation
    inverse: false,
  
    // transformation perspective in pixels
    perspective: 500,
  
    // maximum rotation in degrees
    maxRotation: 10,
  
    // duration in milliseconds
    animationDuration: 200
    
  });*/
                    
    }
    geocodeQuery(zipcode);
    GetMap();
    console.log(longitude);
});
    });

});

var map, infobox, searchManager;

function GetMap() {
    map = new Microsoft.Maps.Map('#myMap', {
        credentials: 'Auv1Og25-4VdEUdvHA2_Vaef_u1C3RW9f0o28hOZDVXIzP0W3yIpbuBqMkmDqT-Z'
    });
    console.log(map);

    //Create an infobox at the center of the map but don't show it.
    infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false
    });

    //Assign the infobox to a map instance.
    infobox.setMap(map);

    //Create random locations in the map bounds.
    // var randomLocations = Microsoft.Maps.TestDataGenerator.getLocations(5, map.getBounds());
    var randomLocations = [];

    console.log(randomLocations);

    for (i=0; i < 5; i++) {
        randomLocations.push(n = {
            latitude: latitudes[i],
            longitude: longitudes[i],
            altitude: 0,
            altitudeReference: -1
        });
    }

    console.log(randomLocations);
    
    for (var i = 0; i < randomLocations.length; i++) {
        var pin = new Microsoft.Maps.Pushpin(randomLocations[i]);
        console.log(randomLocations[i]);
        console.log(pin);

        //Store some metadata with the pushpin.
        pin.metadata = {
            title: 'Pin ' + (i + 1),
            description: businessNames[i]
        };

        //Add a click event handler to the pushpin.
        Microsoft.Maps.Events.addHandler(pin, 'click', pushpinClicked);

        //Add pushpin to the map.
        map.entities.push(pin);
    }
}

function pushpinClicked(e) {
    //Make sure the infobox has metadata to display.
    if (e.target.metadata) {
        //Set the infobox options with the metadata of the pushpin.
        infobox.setOptions({
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            description: e.target.metadata.description,
            visible: true
        });
    }
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