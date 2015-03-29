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
var map;
var infowindow;

var clickedWorkPlace=false;

function showMap(position) {

var latitude  = position.coords.latitude;
var longitude = position.coords.longitude;
var latlng    = new google.maps.LatLng(latitude, longitude);
var mapOpts   = {zoom: 15, center: latlng, mapTypeId: google.maps.MapTypeId.HYBRID};
var canvas    = document.getElementById('map_canvas');
map = new google.maps.Map(canvas, mapOpts);

var pyrmont=new google.maps.LatLng(latitude,longitude);

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

var request1 = {
    location: pyrmont,
    radius: 2000,
    types: ['establishment']
  };
var request2 = {
    location: pyrmont,
    radius: 2000,
    types: ['lodging']
  };
  
var service = new google.maps.places.PlacesService(map);
service.nearbySearch(request1, callback);
service.nearbySearch(request2, callback);
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
function callback(results, status) {
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
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}
