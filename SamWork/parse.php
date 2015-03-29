<!DOCTYPE html>
<html>
<body>
<h1>W3Schools Internal Note</h1>
<div>
<b>Name:</b> <span id="name"></span><br>
<b>Rating:</b> <span id="rating"></span><br>
<b>Location:</b> <span id="location"></span><br>
<b>Number of elements: </b><span id="number"></span>
</div>

<?php
$keyword = "hotels";
$location = "52.4831,-1.8936";
$radius = "1000";
$request = file_get_contents("https://maps.googleapis.com/maps/api/place/nearbysearch/xml?query=$keyword&location=$location&radius=$radius&key=AIzaSyCQ64gMlVG__-TMjQ0jj4lPIMiKDrT_hMg");
file_put_contents("$keyword.xml", $request);
$xml=simplexml_load_file("$keyword.xml") or die("Error: Cannot create object");
$size = $xml->result->count()  . "<br>";
echo $size;
echo $xml->result[1]->name; 

$results = array(array());
$j=0;
for ($i=0;$i<$size;$i++){
if(($xml->result[$i]->name)>3){
$results[$j][0]= $xml->result[$i]->name;
echo $results[$j][0];
$results[$j][1]=$xml->result[$i]->rating;
$results[$j][2]=$xml->result[$i]->geometry->location->lat;
$results[$j][3]=$xml->result[$i]->geometry->location->lnt;
$j++;
}

}
?>





