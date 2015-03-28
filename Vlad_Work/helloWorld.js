window.addEventListener('load', function() {
if (navigator.geolocation)
 	navigator.geolocation.getCurrentPosition(showMap,function(error) {
 	 	alert('Cannot determine your location!');
	});
	else
		alert('Your browser does not support geolocation!');
}); 

 function showMap(position) {
var latitude  = position.coords.latitude;
var longitude = position.coords.longitude;
var latlng    = new google.maps.LatLng(latitude, longitude);
var mapOpts   = {zoom: 15, center: latlng, mapTypeId: google.maps.MapTypeId.HYBRID};
var canvas    = document.getElementById('map_canvas');
var map       = new google.maps.Map(canvas, mapOpts);
var marker    = new google.maps.Marker({position: latlng, map: map});
var dirServ   = new google.maps.DirectionsService();
var dirDisp   = new google.maps.DirectionsRenderer();
var panel     = document.getElementById('dir_panel'); dirDisp.setMap(map); dirDisp.setPanel(panel); 
google.maps.event.addListener(map, 'click', function(event) {
		dirServ.route({origin: latlng, destination: event.latLng, travelMode: google.maps.TravelMode[walkingMode]},  function(result, status) {
		if (status === google.maps.DirectionsStatus.OK)
dirDisp.setDirections(result);

});
});
} 
var walkingMode="DRIVING";
function changeMode()
{
	walkingMode=document.getElementById("travelling").value;
	
}
