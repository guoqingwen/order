var util = require('util');
var models = require('./models');

var User = models.User;

exports.login = function(username, password, callback) {
	console.log('login username:'+username);
	exports.findUserById(username, function(err, doc) {
        if (err)
            callback(err, {ret:0, message:"login is failed!!"});
        else {
            util.log(util.inspect(doc));
            //doc.remove();
            console.log(doc);
            if (doc.password == password)
            	callback(null, {ret:1, message:"login is success!!"});
            else
            	callback(err, {ret:0, message:"password is error!"})
        }
    });
}

exports.users = function(callback) {
	User.find({}, callback);
}

exports.register = function(username, password,callback) {
    var newUser = new User();
    newUser.username = username;
    newUser.password = password;
    newUser.save(function(err){
        if(err){
            util.log("FATAL"+err);
            callback(err);
        }else{
            callback(null);
        }
    });

}

var findUserById = exports.findUserById = function(username,callback){
    User.findOne({username:username},function(err,doc){
        if (err) {
            util.log('FATAL '+ err);
            callback(err, null);
        }
        callback(null, doc);
    });
}