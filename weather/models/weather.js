/**
 * Created by ledinhduy on 13/04/2016.
 */

var https = require('https');

function getWeather(lat, lng) {
    console.log('Start getWeather');

    // sample api key for get weather
    var APIKEY = 'xxxxxxxxxxxxxxxxxx';

    // https://api.forecast.io/forecast/APIKEY/LATITUDE,LONGITUDE
    var baseUrl = 'https://api.forecast.io/forecast/';

    var request = https.get(baseUrl + APIKEY + '/' + lat + ','+ lng, function (response) {

        var body = '';
        response.on('data', function (chunk) {
            body += chunk;
        });
        response.on('end', function () {
            if (response.statusCode == 200) {
                try {
                    var weather = JSON.parse(body);
                    console.log(weather);
                } catch (err) {
                    throw err;
                }
            } else {
                console.log("There were error while getting weather infomation " + response.statusMessage);
            }
        });
    });

    request.on('error', function (error) {
        console.error(error.message);
    });
    console.log('End getWeather');
}

module.exports.get = getWeather;