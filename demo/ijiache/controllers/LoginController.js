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
	    res.render('index.html', doc);
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