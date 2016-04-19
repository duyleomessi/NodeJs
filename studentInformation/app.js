var profile = require('./getStudentInfor');
//var users = ['nguoisechiavn', 'chalkers', 'joykesten2', 'chalkers123'];

/*console.log(process.argv);*/


/*users.forEach(function(username) {
 try {
 profile.get(username);
 } catch(error) {
 printMessage(error);
 }

 });*/

var users = process.argv.slice(2);
users.forEach(profile.get);