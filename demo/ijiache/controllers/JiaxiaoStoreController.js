"use strict";

var config = require('../config');
var db = require('../dao/JiaxiaoStoreDao');
var ObjectType = require('../utils/ObjectType');
var SessionUtils = require('../utils/SessionUtils');
exports.index = function (req, res, next) {
    db.allStores(function (err, todos) {
        if (err) {
            return next(err);
        }
        res.render('store/index.html', {todos: todos});
    });
};

//查看门店列表
exports.getList = function (req, res, next) {
    var jiaxiaoId = req.query.jiaxiaoId;
    var city = req.query.city || '深圳';
    var province = req.query.province || '广东';
    var district = req.query.district || '南山区';
    var obj = {city: city, province:province, district:district};

    console.log('jiaxiaoId:', jiaxiaoId);
    if (jiaxiaoId)
    {
        obj.jiaxiaoId = jiaxiaoId;
    }
    db.findStoreByObj(obj,function (err, todos) {
        if (err) {
            return next(err);
        }
        if (ObjectType.isArray(todos))
        {
            res.json(todos);
        }
        else
        {
            res.json([todos]);
        }
    });
};

exports.add = function (req, res, next) {
    var title = req.body.title || '';
    var jiaxiaoId = req.body.jiaxiaoId || '';
    var city = req.body.city.trim();
    var province = req.body.province.trim();
    var district = req.body.district.trim();
    var address = req.body.address.trim();
    var contact = req.body.contact.trim();
    var iphone = req.body.iphone.trim();
    var telephone = req.body.telephone.trim();
    var admin = req.body.admin.trim();
    var adminPwd = req.body.adminPwd.trim();

    title = title.trim();
    if (!title) {
        SessionUtils.sessionError(req,'名称不能为空');
        return res.redirect('/store');
        //return res.render('error.html', {message: '名称不能为空'});
    }
    db.findStoreByAdmin(admin, function(err, doc){
        if(err){
            SessionUtils.sessionError(req,'用户名校验出错!');
            return res.redirect('/store');
        }
        if (doc){
            SessionUtils.sessionError(req, '管理员用户名已经存在！');
            return res.redirect('/store');
        }
        db.add(jiaxiaoId, title, province, city,district, address, contact, iphone, telephone, admin, adminPwd, function (err, row) {
            if (err) {
                return next(err);
            }
            res.redirect('/store');
        });
    });
};

exports.view = function (req, res, next) {
    res.redirect('/store');
};

exports.edit = function (req, res, next) {
    var id = req.params.id;
    db.findStoreById(id, function (err, row) {
        if (err) {
            return next(err);
        }
        if (!row) {
            return next();
        }
        res.render('store/edit.html', {todo: row});
    });
};

exports.update = function (req, res, next) {
    var id = req.params.id;
    var city = req.body.city.trim();
    var province = req.body.province.trim();
    var district = req.body.district.trim();
    var title = req.body.title || '';
    var address = req.body.address.trim();
    var contact = req.body.contact.trim();
    var iphone = req.body.iphone.trim();
    var telephone = req.body.telephone.trim();
    var admin = req.body.admin.trim();
    var adminPwd = req.body.adminPwd.trim();

    title = title.trim();
    if (!title) {
        return res.render('error.html', {message: '名称不能为空'});
    }
    db.editStore(id,title,province,city,district, address, contact, iphone, telephone, admin, adminPwd, function (err, result) {
        if (err) {
            return next(err);
        }
        res.redirect('/store');
    });
};

exports.delete = function (req, res, next) {
    var id = req.params.id;
    db.delete(id, function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/store');
    });
};

//禁用该门店
exports.available = function (req, res, next) {
    var availabled = req.query.status === 'yes' ? true : false;
    var id = req.params.id;
    db.editAvailabled(id,availabled, function (err, result) {
        if (err) {
            return next(err);
        }
        res.redirect('/store');
    });
};

//检查管理员用户名是否可用
exports.checkAdmin = function (req, res, next) {
    var admin = req.query.admin;//获取url里面的参数
    db.findStoreByAdmin(admin, function (err, result) {
        if (err) {
            return next(err);
        }
        if (result){
            res.json({ret:0, message:'用户名已经存在'});
        }
        else{
            res.json({ret:1, message:'用户名可以使用'});
        }
    });
};
