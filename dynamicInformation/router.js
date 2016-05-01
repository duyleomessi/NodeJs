var Profile = require('./profile');
var renderer = require('./renderer');
var querystring = require('querystring');

var mimeType = {
    'html': 'text/html',
    'css': 'text/css',
    'js': 'text/js',
    'png': 'image/png',
    'jpg': 'image/jpg',
    'jpeg': 'image/jpeg'
}


function style(request, response) {
    if (request.url.indexOf('css') != -1) {
        response.writeHead(200, {'content-type': mimeType['css']});
        renderer.contentType('/views' + request.url, response);
        response.end();
    }
    if (request.url.indexOf('js') != -1) {
        response.writeHead(200, {'content-type': mimeType['js']});
        renderer.contentType('/views' + request.url, response);
        response.end();
    }
    if (request.url.indexOf('png') != -1) {
        response.writeHead(200, {'content-type': mimeType['png']});
        renderer.contentType('/views' + request.url, response);
        response.end();
    }
    if (request.url.indexOf('jpg') != -1) {
        response.writeHead(200, {'content-type': mimeType['jpg']});
        renderer.contentType('/views' + request.url, response);
        response.end();
    }
    if (request.url.indexOf('jpeg') != -1) {
        response.writeHead(200, {'content-type': mimeType['jpeg']});
        renderer.contentType('/views' + request.url, response);
        response.end();
    }
}

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
    if (request.method.toLowerCase() === 'get') {
        var username = request.url;
        username = username.substr(1);

        if (username.length > 0 && username.indexOf('/') == -1) {
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
}

module.exports.homeRoute = homeRoute;
module.exports.userRoute = userRoute;
module.exports.style = style;