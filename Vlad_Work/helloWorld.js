function loadMap() {
if (navigator.geolocation)
 	navigator.geolocation.getCurrentPosition(showMap,function(error) {
 	 	alert('Cannot determine your location!');
	});
else
		alert('Your browser does not support geolocation!');
hotel=localStorage.getItem("hotel").toLowerCase();
work=localStorage.getItem("work").toLowerCase();
}
var work;
var hotel;
var coffee;
var food;
var bar;
var map;
var infowindow;
var latlng;
var pyrmont;

var clickedWorkPlace=false;

function showMap(position) {

var latitude  = position.coords.latitude;
var longitude = position.coords.longitude;
latlng    = new google.maps.LatLng(latitude, longitude);
var mapOpts   = {zoom: 15, center: latlng, mapTypeId: google.maps.MapTypeId.HYBRID};
var canvas    = document.getElementById('map_canvas');
map = new google.maps.Map(canvas, mapOpts);

pyrmont=new google.maps.LatLng(latitude,longitude);

var marker    = new google.maps.Marker({position: latlng, map: map});
var dirServ   = new google.maps.DirectionsService();
var dirDisp   = new google.maps.DirectionsRenderer();
var panel     = document.getElementById('dir_panel'); dirDisp.setMap(map); dirDisp.setPanel(panel); 
google.maps.event.addListener(map, 'click', function(event) {
		dirServ.route({origin: latlng, destination: event.latLng, travelMode: google.maps.TravelMode[walkingMode]},  function(result, status) {
		if (status === google.maps.DirectionsStatus.OK)
dirDisp.setDirections(result);});
});
infowindow = new google.maps.InfoWindow();

var requestGeneral = {
    location: pyrmont,
    radius: 2000,
    types: ['establishment']
  };
var requestHotel = {
    location: pyrmont,
    radius: 2000,
    types: ['lodging']
  };
var service = new google.maps.places.PlacesService(map);
service.nearbySearch(requestGeneral, callback_important);
service.nearbySearch(requestHotel, callback_important);
if(localStorage.getItem("food")=="food")
	searchFood();
if(localStorage.getItem("food")=="food")
	searchRestaurant();
if (localStorage.getItem("bar")=="bar")
	searchBar();
if(localStorage.getItem("coffee")=="coffee")
	searchCoffee();
} 
var walkingMode="DRIVING";
function changeMode()
{
	walkingMode=document.getElementById("travelling").value;
	
}

function setData()
{
	localStorage["hotel"]=document.getElementById("hotel").value;
	localStorage["work"]=document.getElementById("work").value;
}
var foundHotel=false;
function callback_important(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
    foundHotel=false;
    var name=results[i].name.split(" ");
    for(var j=0;j<name.length;j++)
    	if(name[j].toLowerCase()==hotel || name[j].toLowerCase()==work)
    		foundHotel=true;
    if(foundHotel==true)
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
  if(place.rating!=null)
    infowindow.setContent(place.name + " <br></br>   " + place.rating + "/5");
  else
        infowindow.setContent(place.name + " <br></br>   " + "Unrated");
    infowindow.open(map, this);
  });
}
function searchFood()
{
	var requestFood = {
    location: pyrmont,
    radius: 1500,
    types: ['food']
  };
	var service = new google.maps.places.PlacesService(map);
	service.nearbySearch(requestFood, callback_auxiliar);
}
function searchRestaurant()
{
	var requestRestaurant = {
    location: pyrmont,
    radius: 1500,
    types: ['restaurant']
  };
	var service = new google.maps.places.PlacesService(map);
	service.nearbySearch(requestRestaurant, callback_auxiliar);
}
function callback_auxiliar(results, status) 
{
	if (status == google.maps.places.PlacesServiceStatus.OK) {
    	for (var i = 0; i < results.length; i++) 
    	{
    		if(results[i].rating>3.5 && results[i].open_now)
    			createMarker(results[i]);
    	}
    	}
}
function searchBar()
{
	var requestBar = {
   		 location: pyrmont,
    		 radius: 1500,
    		 types: ['bar']
  			};
  	var service = new google.maps.places.PlacesService(map);
	service.nearbySearch(requestBar, callback_auxiliar);
}
function searchCoffee()
{
	var requestCoffee = {
    			location: pyrmont,
    			radius: 2000,
    			types: ['cafe']
  			};
  	var service = new google.maps.places.PlacesService(map);
	service.nearbySearch(requestCoffee, callback_auxiliar);
}
function getCoffee()
{
	var coffeeChecker=document.getElementById("coffee");
	if(coffeeChecker.checked)
		localStorage["coffee"]="coffee";
	else
		localStorage["coffee"]="notcoffee";
}
function getFoodandRestaurant()
{
	localStorage["food"]="notfood";
	var foodChecker=document.getElementsByClassName("eating")
	for(var i=0;i<foodChecker.length;i++)
		if(foodChecker[i].checked)
			localStorage["food"]="food";
}
function getBar()
{
	var barChecker=document.getElementById("bar");
	if(barChecker.checked)
		localStorage["bar"]="bar";
	else
		localStorage["bar"]="notbar";	
}
