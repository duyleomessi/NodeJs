// print message
function printMessage(username, badgeCount, points) {
    var message = username + ' has ' + badgeCount + ' total badge(s) and ' + points + ' points in js';
    console.log(message);
}

// print error
function printError(e) {
    console.log(e.message);
};


module.exports.printMessage = printMessage;
module.exports.printError = printError;