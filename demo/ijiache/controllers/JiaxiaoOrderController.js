"use strict";

var db = require('../dao/JiaxiaoOrderDao');
var classDb = require('../dao/JiaxiaoClassDao');
var storeDb = require('../dao/JiaxiaoStoreDao');

exports.index = function (req, res, next) {
    var province = req.query.province || '广东';
    var city = req.query.city || '深圳';
    var district = req.query.district || '南山区';
    var jiaxiaoId = req.query.jiaxiaoId;
    var storeId = req.query.storeId;
    var orderDate = req.query.orderDate;

    /*storeDb.findStoreByObj({jiaxiaoId:jiaxiaoId, province:province, city:city, district:district}, function(err, doc){

    });*/

    classDb.findOneByObj({storeId:storeId,startDate:{"$gt":orderDate},endDate:{"$lt":orderDate}},function (err, todos) {
        if (err) {
            return next(err);
        }
        res.render('admin/order_class_list.html', {todos: todos});
    });
};

exports.getName = function (req, res, next) {
    var jiaxiaoId = req.query.id;
    db.findTodoById(jiaxiaoId, function (err, todos) {
        if (err) {
            return next(err);
        }
        res.json(todos);
    });
};

exports.getList = function (req, res, next) {
    db.allJiaxiaos(function (err, todos) {
        if (err) {
            return next(err);
        }
        res.json(todos);
    });
};

exports.new = function (req, res, next) {
    var title = req.body.title || '';
    title = title.trim();
    if (!title) {
        return res.render('error.html', {message: '名称不能为空'});
    }
    db.add(title, function (err, row) {
        if (err) {
            return next(err);
        }
        res.redirect('/jiaxiao');
    });
};

exports.view = function (req, res, next) {
    res.redirect('/jiaxiao');
};

exports.edit = function (req, res, next) {
    var id = req.params.id;
    db.findTodoById(id, function (err, row) {
        if (err) {
            return next(err);
        }
        if (!row) {
            return next();
        }
        res.render('jiaxiao/todo/edit.html', {todo: row});
    });
};

exports.save = function (req, res, next) {
    var id = req.params.id;
    var title = req.body.title || '';
    title = title.trim();
    if (!title) {
        return res.render('error.html', {message: '名称不能为空'});
    }
    db.editTitle(id,title,function (err, result) {
        if (err) {
            return next(err);
        }
        res.redirect('/jiaxiao');
    });
};

exports.delete = function (req, res, next) {
    var id = req.params.id;
    db.delete(id, function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/jiaxiao');
    });
};

exports.finish = function (req, res, next) {
    var finished = req.query.status === 'yes' ? true : false;
    var id = req.params.id;
    db.editFinished(id,finished, function (err, result) {
        if (err) {
            return next(err);
        }
        res.redirect('/jiaxiao');
    });
};
