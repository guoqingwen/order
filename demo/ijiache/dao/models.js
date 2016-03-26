var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var dburl = require("../config").db;//数据库地址
// Define User schema 
var _User = new Schema({ 
    username : String, //用户名
    name : String,//真实姓名
    password : String,//密码
    email:String,//邮箱
    iphone:String,//手机
    notice:String,//简介
    checkIphone:{type:Boolean, default:false},//是否验证手机
    checkEmail:{type:Boolean, default:false},//是否验证邮箱
    checkWeixin:{type:Boolean, default:false}//是否验证微信
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