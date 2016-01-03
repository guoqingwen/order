"use strict";

var db = require('../dao/JiaxiaoClassDao');
var storeDb = require('../dao/JiaxiaoStoreDao');
var ObjectType = require('../utils/ObjectType');
var SessionUtils = require('../utils/SessionUtils');

require('date-utils');

//查看列表
exports.getClassList = function (req, res, next) {

    if(req.session.store)
    {
        var storeId = req.session.store.storeId;
        db.findOneByObj({storeId:storeId},function (err, doc) {
            if (err) {
                return next(err);
            }
            res.render('admin/store_class.html',{todos:doc});
        });
    }
    else
    {
        res.render('message.html',{message:"登陆失效，请重新登陆！"});
    }
};

exports.adminList = function(req, res, next){
    db.allClass(function (err, todos) {
        if (err) {
            return next(err);
        }
        res.json(todos);
    });
}

//store_class_add
exports.add = function (req, res, next) {
    var title = req.body.title;
    var storeId = req.body.storeId;
    var startDate = new Date(req.body.startDate);
    var endDate = new Date(req.body.endDate);
    var startTime = new Date(req.body.startDate+' '+req.body.startTime+':00');
    var endTime = new Date(req.body.startDate+' '+req.body.endTime+':00');
    var allUsed = req.body.allUsed == 1;
    //console.log(title, storeId, allUsed);

    title = title.trim();
    if (!title) {
        SessionUtils.sessionError(req, '名称不能为空');
        res.redirect('/store_class_add');
        return;
    }

    db.add(storeId, title, startTime, endTime, startDate, endDate, allUsed, function (err, row) {
        if (err) {
            return next(err);
        }
        res.redirect('/store_class_list');
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
