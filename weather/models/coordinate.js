/**
 * Created by ledinhduy on 13/04/2016.
 */

var https = require('https');
var weather = require('./weather');

function getCoordinate(lat, lng) {
    var MAP_APIKEY = 'xxxxxxxxxxxxxxxxxxxxxx';
    // follow below link for key
    // https://console.developers.google.com/flows/enableapi?apiid=geocoding_backend&keyType=SERVER_SIDE&reusekey=true


    var address = process.argv.slice(2); // 1600+Amphitheatre+Parkway,+Mountain+View,+CA
    var baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=';

    var request = https.get(baseUrl + MAP_APIKEY, function (response) {
        var body = '';
        response.on('data', function (chunk) {
            body += chunk;
        });

        response.on('end', function () {
            if (response.statusCode === 200) {
                try {
                    var coordinate = JSON.parse(body);
                    var location = coordinate.results[0].geometry.location;
                    lat = location.lat;
                    lng = location.lng;

                    weather.get(lat, lng);

                } catch (err) {
                    console.log(err.message);
                }
            } else {
                console.log("There were error while getting coordinate information: " + response.statusMessage);
            }
        });
    });

    request.on('error', function (err) {
        console.error(err.message);
    });
}

module.exports.get = getCoordinate;