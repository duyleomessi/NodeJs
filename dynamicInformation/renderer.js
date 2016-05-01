//4. Function that handles the reading of files and merge in value
// read from file and get a string
// merge values into string

var fs = require('fs');
var path = require('path');

function mergerValues(values, content) {
    for (key in values) {
        // Replace all {{key}} with the value from the values object
        content = content.toString().replace('{{' + key + '}}', values[key]);
    }
    // return merged content
    return content;
}

function view(templateName, values, response) {
    var fileContents = fs.readFileSync('./views/' + templateName + '.html');
    // Insert value to the content
    fileContents = mergerValues(values, fileContents);
    // Write out the content to response
    response.write(fileContents);
}

function contentType(templateName, response) {
    var fileContents = fs.readFileSync(__dirname + templateName, {encode: 'utf-8'});
    response.write(fileContents);
};

module.exports.view = view;
module.exports.contentType = contentType;