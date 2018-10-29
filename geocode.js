var yargs = require('yargs');
var req = require('request');
var util = require('util');
var moment = require('moment');

console.log("\u001b[2J\u001b[0;0H");
console.log("\n\n\n\t\t\t\tWelcome to the GeoCode Weather Station...\n\n\n");
console.log("\n\t\tTime: ",moment().format("HH:mm"));
var argv = yargs
            .options({
                a: {
                    demand : true,
                    describe : 'Address to fetch the Weather',
                    string : true,
                }
            })
            .help()
            .alias('help', 'h')
            .argv;
//console.log(argv);

var adr = argv.a;
var key = "AIzaSyChydl0uCbJXkAZyZC6H2guUy3fgJeGRJ8"
adr = encodeURIComponent(adr);
var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${adr}&key=${key}`

//console.log("\n\n",url);

req({
    url : url, 
    json : true
    }, 
    
    (error, response, body) => 
    {
    if(body.status === "OK")
        {
        var lat = body.results[0].geometry.location.lat;
        var lng = body.results[0].geometry.location.lng;
            console.log("\n\t\tPlace: ",argv.a);
            var _url = `https://api.darksky.net/forecast/7dd618f2b1a7e96f7ddc4db270c9b2d5/${lat},${lng}`

            req({
                url: _url, json : true},
                (err, res, bod) => {console.log("\n\t\tSummary: ",bod.currently.summary); 
                                    var temp = (bod.currently.temperature-32)*(5/9);
                                    console.log("\n\t\tLocation: ",lat.toFixed(2), "°N ,",lng.toFixed(2), "°E");
                                    console.log("\n\t\tTemperature : ",temp.toFixed(2),"°C, ",bod.currently.temperature, "°F\n\n\n\n\n");
                                    })
                    console.log("\n\nThank you for using this application..!\n\n");
        }
    }   
   )

