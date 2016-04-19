var https = require('https');
var http = require('http');
var print = require('./print.js');


// Connect to API URL (https://teamtreehouse.com/username.json)
function getProfile(username) {
    var request = https.get('https://teamtreehouse.com/' + username + '.json', function (respon) {
        console.log(respon.statusCode);

        var body = '';

        // Read data
        respon.on('data', function (chunk) {
            body += chunk;
        });

        respon.on('end', function () {
            if (respon.statusCode === 200) {
                try {
                    var profile = JSON.parse(body);
                    print.printMessage(username, profile.badges.length, profile.points.JavaScript);
                } catch (e) {
                    // parse error
                    print.printError(e);
                }
            } else {
                print.printError({message: 'There was an error getting profile for ' + username + '. ' + respon.statusMessage});
            }

        });
    });

    request.on('error', print.printError);
}

module.exports.get = getProfile;
