var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var dburl = require("../config").db;//数据库地址
// Define User schema 
var _User = new Schema({ 
    username : String, 
    password : String,
    email:String
});
// export them 
exports.User = mongoose.model('t_user', _User);

exports.connect = function(callback) {
    mongoose.connect(dburl);
}

exports.disconnect = function(callback) {
    mongoose.disconnect(callback);
}

exports.setup = function(callback) { callback(null); }