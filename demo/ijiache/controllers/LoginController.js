"use strict";

var config = require('../config');
var db = require('../dao/LoginDao');

exports.userLogin = function (req, res, next) {
	var username = req.body.username || '';
	var password = req.body.password || '';
	console.log("request login....");
	db.login(username, password,function (err, doc) {
	    if (err) {
	        return next(err);
	    }
	    console.log(doc);
	    var userObj = {'username':username, isStore:false,test:'test文件'};
        req.session.user = userObj;
        res.redirect('/admin');
	});
};

exports.userRegister = function (req, res, next) {
	var username = req.body.username || '';
	var password = req.body.password || '';
	var email = req.body.email || '';

	db.register(username, password, email,function (err, doc) {
	    if (err) {
	        return next(err);
	    }
        //req.session.user = {'username':username};
	    res.render('message.html', doc);
	});
};

//忘记密码
exports.userForget = function (req, res, next) {
	var email = req.body.email || '';

	db.forget(email,function (err, doc) {
	    if (err) {
	        return next(err);
	    }
	    res.json(doc);
	});
};

exports.users = function (req, res, next) {
	db.users(function (err, doc) {
	    if (err) {
	        return next(err);
	    }
	    res.json(doc);
	});
};

exports.updatePwd = function (req, res, next) {
	var username = req.body.username;
	var pwd = req.body.pwd;
	var newPwd = req.body.newPwd;
	var newPwdTwo = req.body.newPwdTwo;
	var message = "";

	if (newPwd == newPwdTwo)
	{
		if (newPwd == pwd)
		{
			res.render("message.html",{message:"新密码与原密码一致"});
		}
		else {
			db.findUserById(username, function (err, doc) {
				if (err)
				{
					res.render("message.html",{message:"修改密码错误"});
				}
				if (doc) {
					console.log("updatePwd:",doc);
					if (doc.password == pwd) {
						doc.password = newPwd;
						doc.save(function(err) {
							if (err) {
								util.log('FATAL '+ err);
								res.render("message.html",{message:"修改密码错误"});
							}
							else
							{
								res.render("message.html",{message:"修改密码成功"});
							}
						});
					}
					else {
						res.render("message.html",{message:"原密码错误"});
					}
				}
			});
		}
	}
	else
	{
		res.render("message.html",{message:"密码两次输入不一致！"});
	}

};