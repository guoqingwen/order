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
exports.register = function (req, res, next) {
    res.render('register.html');
};
exports.updatePwd = function (req, res, next) {
    res.render("admin_password.html",{user:req.session.user});
};
exports.admin = function (req, res, next) {
    if(req.session.user){
        if (req.session.user.isStore)//如果门店用户管理员登陆
        {
            res.render('admin/admin_store.html', {user:req.session.user});
        }
        else
        {
            res.render('admin_user.html', {user:req.session.user});
        }
    } 
    else{
        res.redirect('/login');
    }
};

exports.init = function (req, res, next) {
    var user = new User({ 
        username : 'wenguoqing', 
        password : '123456',
        email:'568565953@qq.com'
    }); 
    user.save(); 
    user = new User({ 
        username : 'test1', 
        password : '123456',
        email:'wenguoqing1991@126.com'
    }); 
    user.save(); 
    res.send('Data inited'); 
};