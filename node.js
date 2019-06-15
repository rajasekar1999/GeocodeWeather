$(document).ready(function(){

	$("#result").html("Welcome to the GeoCode Weather Station...<br>");
	console.log("\n\n\n\t\t\t\tWelcome to the GeoCode Weather Station...\n\n\n");
	$("#result").append("Time: ",moment().format("HH:mm"),"<br>");
	console.log("\n\t\tTime: ",moment().format("HH:mm"));

	//console.log("\n\n",url);
	$("button").click(function(){
		var adr = document.getElementById("address").value;
		console.log(adr);
		$("#result").append("Results Fetching for ",adr);
		
		var key = "AIzaSyChydl0uCbJXkAZyZC6H2guUy3fgJeGRJ8"
		var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${adr}&key=${key}`

		$.getJSON('url', function(data) 
		{
        	var lat = ${data.results[0].geometry.location.lat}
        	var lng = ${data.results[0].geometry.location.lng}

			var lt = lat.toString();
			var ln = lng.toString();        	

        	$("#result").append("latitude: ",lat);
			$("#result").append("longitude: ",lng);            	
    	});
		
		var _url = `https://api.darksky.net/forecast/7dd618f2b1a7e96f7ddc4db270c9b2d5/${lt},${lg}`
		
		$.getJSON('_url', function(result) 
		{    
    		var summary = ${result.currently.summary}
    		var temp = ${result.currently.temperature}	
		});
	});
});
