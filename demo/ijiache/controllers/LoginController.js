"use strict";

var config = require('../config');
var db = require('../dao/LoginDao');
var SessionUtils = require('../utils/SessionUtils');

require('date-utils');

exports.userLogin = function (req, res, next) {
	var username = req.body.username || '';
	var password = req.body.password || '';
	console.log("request login....");
	db.login(username, password,function (err, doc) {
	    if (err) {
	        return next(err);
	    }
	    //console.log(doc);
		var userObj = {'username':username, isStore:false,test:'test'};
		if(doc.ret == 0)
		{
			SessionUtils.sessionError(req, doc.message);
			res.redirect('/login');
		}
		else
		{
			if(doc.ret == 2){
				userObj.isStore = true;
				req.session.store = {
					storeId:doc.store._id,
					title:doc.store.title,
					availabled_date:doc.store.availabled_date.toFormat("YYYY-MM-DD")
				};
				console.log("管理员登陆成功，", req.session.store);
			}
			else if(doc.ret == 1){
				userObj.userId = doc.user._id;
			}
			req.session.user = userObj;
			res.redirect('/admin');
		}
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

exports.edit = function (req, res, next) {
	var userId = req.params.id;
	db.findByObj({_id:userId}, function (err, doc) {
		if (err) {
			return next(err);
		}
		//console.log("edit:", doc);
		res.render("admin/admin_user_info.html",{todo:doc});
	});
};

exports.save = function (req, res, next) {
	var userId = req.params.id;
	db.findByObj({_id:userId}, function (err, doc) {
		if (err) {
			return next(err);
		}
		doc.iphone = req.body.iphone;
		doc.email = req.body.email;
		doc.name = req.body.name;
		doc.save(function(err){
			if(err){
				req.session.errmsg = "修改个人信息失败";
			}
			res.redirect("/user/"+doc._id+"/edit");
		});
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