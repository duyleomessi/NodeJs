var Profile = require('./profile');
var renderer = require('./renderer');
var querystring = require('querystring');

//2. Handle HTTP route GET / and POST / i.e. Home

function homeRoute(request, response) {

    if (request.url === '/') {
        // if url === / && GET
        if (request.method.toLowerCase() === 'get') {
            response.writeHead(200, {'content-type': 'text/html'});
            renderer.view('header', {}, response);
            renderer.view('search', {}, response);
            renderer.view('footer', {}, response);
            response.end();
        }

        // if url === / && POST
        if (request.method.toLowerCase() === 'post') {
            // get the data from the body
            request.on('data', function (postBody) {
                // extract the username
                var query = querystring.parse(postBody.toString());
                // redirect to /:username
                response.writeHead(303, {'Location': '/' + query.username});
                response.end();
            });
        }
    }
}

//3. Handle HTTP route GET /:username i.e. /chalkers

function userRoute(request, response) {
    var username = request.url.replace('/', '');
    if (username.length > 0) {
        response.writeHead(200, {'content-type': 'text/html'});
        renderer.view('header', {}, response);

        // get json from treehouse
        var studentProfile = new Profile(username);

        // on 'end'
        studentProfile.on('end', function (profileJSON) {
            // show profile

            // Store the values which we need
            var values = {
                avatarUrl: profileJSON.gravatar_url,
                username: profileJSON.profile_name,
                badges: profileJSON.badges.length,
                javascriptPoints: profileJSON.points.JavaScript
            }

            // Simple response
            //response.write(values.username + ' has ' + values.badges + ' badges in total ' + ' and ' + values.javascriptPoints + ' javascript points' + '\n');
            renderer.view('profile', values, response);
            renderer.view('footer', {}, response);
            response.end();
        });

        // on 'error'
        studentProfile.on('error', function (error) {
            renderer.view('error', {errorMessage: error.message}, response);
            renderer.view('search', {}, response);
            renderer.view('footer', {}, response);
            response.end();
        })
    }
}

exports.homeRoute = homeRoute;
exports.userRoute = userRoute;