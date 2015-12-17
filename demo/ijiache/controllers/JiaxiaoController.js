"use strict";

var config = require('../config');
var db = require('../dao/JiaxiaoDao');

exports.index = function (req, res, next) {
    db.allTodos(function (err, todos) {
        if (err) {
            return next(err);
        }
        res.render('jiaxiao/index.html', {todos: todos});
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
