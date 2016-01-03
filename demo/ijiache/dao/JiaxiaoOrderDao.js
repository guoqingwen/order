/** 报名表 */
var util = require('util');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('date-utils');

//定义OrderScheme对象模型
//表示学员报名课程表
var OrderScheme = new Schema({
    classId:String,//课程id
    orderDate:{type:Date,default:Date.now},//日期
    orderUsers:[
        {
            userId: String,//用户id
            notice: String,//说明备注，会通知到管理员
            successed:{type:Boolean,default:false}//表示报名被确认
        }
    ]
});

//访问class对象模型
mongoose.model('t_jiaxiao_order_store', OrderScheme);
var JiaxiaoOrderStore = mongoose.model('t_jiaxiao_order_store');

//添加报名
exports.add = function(classId, date, userId, notice, callback) {

    exports.findOneByObj({"classId":classId, "orderDate":date}, function(err, doc) {
        if (err)
            callback(err);
        else if (doc.length > 0) {
            var hased = false;
            for(var i = doc.orderUsers.length - 1; i >= 0; i--){
                if(doc.orderUsers[i].userId == userId){
                    hased = true;
                    break;
                }
            }
            if(!hased){
                doc.orderUsers.push({userId: userId, notice: notice, successed: false});
            }
        }
        else {
            var newOrder = new JiaxiaoOrderStore();
            newOrder.classId = classId;
            newOrder.orderDate = date;
            newOrder.orderUsers.push({userId: userId, notice: notice, successed: false});

            doc = newOrder;
        }
        doc.save(function (err) {
            if (err) {
                util.log("FATAL" + err);
                callback(err);
            } else {
                callback(null);
            }
        });
    });
}

//获取用户报名课程列表
exports.userOrders = function(userId, callback) {
    exports.findOneByObj({"orderUsers.userId":userId}, function(err, doc) {
        if (err)
            callback(err);
        else if (doc)
            callback(null, doc);
    });
}

//获取可以报名课程列表
exports.ordersByDate = function(date, callback) {
    exports.findOneByObj({"date":date}, callback);
}

//获取可以报名课程列表
exports.ordersByClass = function(classId, callback) {
    exports.findOneByObj({"classId":classId}, callback);
}

//获取可以报名课程列表
exports.orders = function(classId, date, callback) {
    exports.findOneByObj({"classId":classId, "date":date}, callback);
}

//获取可以报名课程列表
exports.ordersByDateGap = function(startDate, endDate, callback) {
    //exports.findOneByObj({"classId":classId, "date":date}, callback);
}

exports.delete = function(id, userId, callback) {
    exports.findOneById(id, function(err, doc) {
        if (err || !doc)
            callback(err);
        else if(doc){
            util.log(util.inspect(doc));
            for(var i = doc.orderUsers.length - 1;i>=0;i--){
                if(doc.orderUsers[i].userId == userId){
                    doc.orderUsers.splice(i, 1);
                    break;
                }
            }
            if(doc.orderUsers.length == 0){
                doc.remove();
                callback(null);
            }
            else{
                doc.save(function(err){
                    callback(err,null);
                });
            }
        }
    });
}

/** 修改信息 */
exports.editOrder = function(classId, date, userId, notice, success, callback) {
    exports.findOneByObj({"classId":classId, "date":date, "orderUsers.userId":userId}, function(err, doc) {
        if (err)
            callback(err);
        else if (doc){
            doc.orderUsers[0].notice = notice;
            doc.orderUsers[0].successed = success;

            doc.save(function(err) {
                if (err) {
                    util.log('FATAL '+ err);
                    callback(err);
                } else
                    callback(null);
            });
        }
    });
}

/**获取列表*/
exports.allOrders = function(callback) {
    JiaxiaoOrderStore.find({}, callback);
}

exports.forAll = function(doEach, done) {
    JiaxiaoOrderStore.find({}, function(err, docs) {
        if (err) {
            util.log('FATAL '+ err);
            done(err, null);
        }
        docs.forEach(function(doc) {
            doEach(null, doc);
        });
        done(null);
    });
}

var findOneById = exports.findOneById = function(id,callback){
    JiaxiaoOrderStore.findOne({_id:id},function(err,doc){
        if (err) {
            util.log('FATAL '+ err);
            callback(err, null);
        }
        callback(null, doc);
    });
}

exports.findOneByObj = function(findObj, callback){
    JiaxiaoOrderStore.find(findObj,function(err,doc){
        if (err) {
            util.log('FATAL '+ err);
            callback(err, null);
        }
        callback(null, doc);
    });
}



