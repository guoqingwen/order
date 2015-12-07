var util = require('util');
var models = require('./models');

var User = models.User;

//查询所有用户列表
exports.users = function(callback) {
    User.find({}, callback);
}

//用户登录
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

//用户注册
exports.register = function(username, password, email,callback) {
    exports.findEmailById(email, function(err, doc) {
        if (err){
            callback(err, {ret:0, message:"注册失败!!"});
        }
        else if(doc){
            callback(err, {ret:0, message:"邮箱已经存在:"+email});
        }
    });
    exports.findUserById(username, function(err, doc) {
        if (err){
            callback(err, {ret:0, message:"注册失败!!"});
        }
        else if(doc){
            callback(err, {ret:0, message:"用户名已经存在!"})
        }
        else{
            var newUser = new User();
            newUser.username = username;
            newUser.password = password;
            newUser.email = email;
            newUser.save(function(err){
                if(err){
                    util.log("FATAL"+err);
                    callback(err, {ret:1, message:"用户注册失败!"});
                }else{
                    console.log('register is success:', username);
                    callback(null, {ret:1, message:"用户注册成功!"});
                }
            });
        }
    });
}

//检查用户
exports.checkUserName = function(username, callback) {
    exports.findUserById(username, function(err, doc) {
        if (err){
            callback(err, {ret:0, message:"check is failed!!"});
        }
        else if(doc){
            callback(err, {ret:0, message:"用户名已经存在!"})
        }
        else{
            callback(err, {ret:1, message:"用户名可以使用!"})
        }
    });
}

//用户重置密码
exports.forget = function(email, callback) {
    exports.findEmailById(email, function(err, doc) {
        if (err){
            callback(err, {ret:0, message:"forget is failed!!"});
        }
        else if(doc){
            callback(err, {ret:1, message:"重置链接已经发送到你的邮箱:"+email});
        }
        else{
            callback(err, {ret:0, message:"您输入的邮箱地址不存在！"});
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
var findEmailById = exports.findEmailById = function(email,callback){
    User.findOne({email:email},function(err,doc){
        if (err) {
            util.log('FATAL '+ err);
            callback(err, null);
        }
        callback(null, doc);
    });
}