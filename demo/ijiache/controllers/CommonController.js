"use strict";

var config = require('../config');
var db = require('../dao/LoginDao');
var models = require('../dao/models');
var User = models.User;

exports.index = function (req, res, next) {
    res.render('index.html');
};
exports.login = function (req, res, next) {
    res.render('login.html');
};

exports.init = function (req, res, next) {
    var user = new User({ 
        username : 'wenguoqing', 
        password : '123456'
    }); 
    user.save(); 
    user = new User({ 
        username : 'test1', 
        password : '123456'
    }); 
    user.save(); 
    res.send('Data inited'); 
};