"use strict";

var config = require('../config');
var db = require('../dao/LoginDao');

exports.userLogin = function (req, res, next) {
	var username = req.body.username || '';
	var password = req.body.password || '';

	db.login(username, password,function (err, doc) {
	    if (err) {
	        return next(err);
	    }
	    console.log(doc);
	    var userObj = {'username':username};
        req.session.user = userObj;
        res.redirect('/admin');
	    //res.render('admin.html');
	});
};

exports.userRegister = function (req, res, next) {
	var username = req.body.username || '';
	var password = req.body.password || '';

	db.register(username, password,function (err, doc) {
	    if (err) {
	        return next(err);
	    }
        req.session.user = {'username':username};
	    res.render('message.html', doc);
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