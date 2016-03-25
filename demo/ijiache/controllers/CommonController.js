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
exports.login_lock = function (req, res, next) {
    res.render('admin/admin_lock.html', {user:req.session.user});
};
exports.register = function (req, res, next) {
    res.render('register.html');
};
exports.updatePwd = function (req, res, next) {
    res.render("admin/admin_password.html",{user:req.session.user});
};
exports.orderClass = function (req, res, next) {
    res.render("admin/order_class.html",{user:req.session.user, condition:{province:"广东",city:"深圳",district:"南山区"}, orders:[]});
};
exports.classAdd = function (req, res, next) {
    res.render("admin/add_class.html",{user:req.session.user, store:req.session.store, condition:{province:"广东",city:"深圳",district:"南山区"}});
};
exports.checkEmail = function (req, res, next) {
    var email = req.query.email;
    var id = req.query.id;
    res.render('admin/check_email.html',{email:email, id:id});
};

exports.checkIphone = function (req, res, next) {
    var iphone = req.query.iphone;
    var id = req.query.id;
    res.render('admin/check_iphone.html',{iphone:iphone, id:id});
};

exports.getVerificationCode = function (req, res, next) {
    var iphone = req.query.username;

    res.render('admin/check_iphone.html',{iphone:iphone, id:id});
};

exports.admin = function (req, res, next) {
    if(req.session.user){
        if (req.session.user.isStore)//如果门店用户管理员登陆
        {
            res.render('admin/admin_store.html', {user:req.session.user,store:req.session.store});
        }
        else
        {
            res.render('admin/admin_user.html', {user:req.session.user});
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

exports.demo = function (req, res, next) {
    res.render('demo/index.html');
};