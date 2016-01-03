"use strict";

var db = require('../dao/JiaxiaoOrderDao');
var userDb = require('../dao/LoginDao');
var classDb = require('../dao/JiaxiaoClassDao');
var orderDb = require('../dao/JiaxiaoOrderDao');
var storeDb = require('../dao/JiaxiaoStoreDao');
var dateUtils = require('../utils/DateUtils');
var DBQuery = require('../utils/DBQuery');
require('date-utils');

exports.index = function (req, res, next) {
    var province = req.query.province || '广东';
    var city = req.query.city || '深圳';
    var district = req.query.district || '南山区';
    var jiaxiaoId = req.query.jiaxiaoId;
    var storeId = req.query.storeId;
    var orderDate = req.query.orderDate;

    //console.log(orderDate);
    /*storeDb.findStoreByObj({jiaxiaoId:jiaxiaoId, province:province, city:city, district:district}, function(err, doc){
    });*/
    var obj = {
        "storeId":storeId,
        "availabled":true,
        "$or":[{"allUsed":true}, { startDate:{"$gt":orderDate}, endDate:{"$gt":orderDate}}]
        //"$or":[{"allUsed":true}, { startDate:{"$gt":orderDate}, endDate:{"$lt":orderDate}}]
    };

    //{"$or": [{"name":"stephen1"}, {"age":35}]}startDate:{"$gt":orderDate},endDate:{"$lt":orderDate}
    classDb.findOneByObj(obj,function (err, todos) {
        if (err) {
            return next(err);
        }
        //console.log(todos);
        var orders = [];
        var len = todos.length;
        for(var i = 0; i <len; i++)
        {
            var order = {};
            var todo = todos[i];
            order._id = todo._id;
            order.title = todo.title;
            order.startTime = dateUtils.dateToTimeStr(todo.startTime);
            order.endTime = dateUtils.dateToTimeStr(todo.endTime);
            orders.push(order);
        }
        res.render('admin/order_class_list.html', {orders: orders,orderDate:orderDate});
    });
};

// 用户登陆我的报名课程
exports.userOrderList = function (req, res, next) {
    if(!req.session.user)res.redirect('/login');
    var userId = req.session.user.userId;

    var obj = {
        "orderUsers.userId":userId
    };
    orderDb.findOneByObj(obj,function (err, todos) {
        if (err) {
            return next(err);
        }
        //console.log(obj, todos);
        var orders = [];
        var len = todos.length;
        var queryNum = len;
        for(var i = 0; i <len; i++)
        {
            var order = {};
            var todo = todos[i];
            order.orderDate = dateUtils.dateToYearStr(todo.orderDate);
            order._id = todo._id;
            var userObj = {};
            for(var j = todo.orderUsers.length-1; j >= 0; j--)
            {
                if(todo.orderUsers[j].userId == userId){
                    userObj = todo.orderUsers[j];
                    break;
                }
            }
            order.classId = todo.classId;
            DBQuery.query(classDb.findOneById,todo.classId,order,{"title":"title","startTime":"startTime","endTime":"endTime"},function(){
                queryNum--;
                if(queryNum == 0){
                    res.render('admin/order_list.html', {orders: orders});
                }
            });
            order.userId = userId;
            order.notice = userObj.notice;
            order.successed = userObj.successed;
            orders.push(order);
        }
        //res.render('admin/order_list.html', {orders: orders});
    });
};

// 管理员报名列表
exports.adminOrderList = function (req, res, next) {
    if(!req.session.store)res.redirect('/login');
    var storeId = req.session.store.storeId;
    var today = new Date();

    var obj = {
        "storeId":storeId,
        //"startDate":{"$gte":today}
    };
    //console.log("管理员报名列表:", obj);
    classDb.findOneByObj(obj,function (err, todos) {
        if (err) {
            return next(err);
        }
        //console.log(obj, todos);
        var orders = [];
        var len = todos.length;
        var classNum = len;
        if(classNum == 0){
            res.render('admin/order_list_store.html', {orders: orders});
        }
        for(var i = 0; i <len; i++)
        {
            var order = {};
            var todo = todos[i];//课程信息
            DBQuery.query(orderDb.findOneByObj,{classId:todo._id},order,
                {"orderDate":"orderDate","_id":"_id","orderUsers":"orderUsers"},
                function(hasData){
                    classNum--;
                    if(hasData){
                        var users = order.orderUsers;
                        var successNum = 0;
                        for(var i = users.length - 1; i >= 0; i--){
                            var userObj = users[i];
                            if(userObj.successed){
                                successNum++;
                            }
                        }
                        order.successNum = successNum;
                        order.orderNum = order.orderUsers.length;
                        orders.push(order);
                    }
                    if(classNum == 0){
                        res.render('admin/order_list_store.html', {orders: orders});
                    }
                }
            );
            order.classId = todo._id;
            order.title = todo.title;
            order.startTime = dateUtils.dateToTimeStr(todo.startTime);
            order.endTime = dateUtils.dateToTimeStr(todo.endTime);
        }
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
    db.allOrders(function (err, todos) {
        if (err) {
            return next(err);
        }
        res.json(todos);
    });
};

//添加报名
exports.add = function (req, res, next) {
    if(!req.session.user)res.redirect("/login");
    var classId = req.body.classId;
    var orderDate = new Date(req.body.orderDate);
    var userId = req.session.user.userId;
    var notice = req.body.notice || '';
    //console.log("order add:",req.session.user);
    db.add(classId,orderDate, userId, notice , function (err, row) {
        if (err) {
            req.session.errmsg = '报名失败!';
        }
        res.redirect('/userOrderList');
    });
};

//添加报名
exports.addHtml = function (req, res, next) {
    if(!req.session.user)res.redirect("/login");
    var classId = req.params.id;
    var orderDate = req.query.orderDate;
    classDb.findOneById(classId, function (err, doc) {
        if(doc)
        {
            var todo = {};
            todo.title = doc.title;
            todo.startTime = doc.startTime.toFormat("HH24:MI:SS");
            todo.endTime = doc.endTime.toFormat("HH24:MI:SS");
            res.render('admin/add_order.html',{classId:classId,orderDate:orderDate,classData:todo});
        }
    });
};

exports.edit = function (req, res, next) {
    var id = req.params.id;
    var title = req.query.title;
    var startTime = req.query.startTime;
    var endTime = req.query.endTime;
    db.findOneById(id, function (err, row) {
        if (err) {
            return next(err);
        }
        if (!row) {
            return next();
        }
        row.title = title;
        row.startTime = startTime;
        row.endTime = endTime;
        row.orderDateStr = dateUtils.dateToYearStr(row.orderDate);
        var users = row.orderUsers;
        var successNum = 0;
        var userNum = users.length;
        for(var i = users.length - 1; i >= 0; i--){
            var userObj = users[i];
            DBQuery.query(userDb.findByObj,{_id:userObj.userId},userObj,
                {"username":"username","name":"name"},
                function(hasData){
                    userNum--;
                    if(userNum == 0){
                        res.render('admin/order_edit_store.html', {todo: row});
                    }
                }
            );
            if(userObj.successed){
                successNum++;
            }
        }
        row.successNum = successNum;
        row.orderNum = row.orderUsers.length;

        //res.render('admin/order_edit_store.html', {todo: row});
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

//删除报名
exports.delete = function (req, res, next) {
    var id = req.params.id;
    var userId = req.session.user.userId;
    if (userId){
        console.log('order delete:',userId, id);
        db.delete(id, userId, function (err) {
            if (err) {
                req.session.errmsg = '删除失败';
            }
            res.redirect('/userOrderList');
        });
    }
    else{
        req.session.errmsg = '删除失败';
        res.redirect('/userOrderList');
    }
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

exports.bindEmail = function (req, res, next) {
    var iphone = req.body.iphone;
    var id = req.body.id;
    var code = req.body.code;
    res.redirect('/user/'+id+'/edit');
};

exports.bindIphone = function (req, res, next) {
    var iphone = req.body.iphone;
    var id = req.body.id;
    var code = req.body.code;
    res.redirect('/user/'+id+'/edit');
};
