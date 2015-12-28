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
    exports.findOneByObj({"classId":classId, "date":date}, function(err, doc) {
        if (err)
            callback(err);
        else if (doc) {
            doc.orderUsers.push({userId: userId, notice: notice, successed: false});
        }
        else {
            var newOrder = new JiaxiaoOrderStore();
            newOrder.classID = classId;
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

exports.delete = function(id, callback) {
    exports.findOneById(id, function(err, doc) {
        if (err)
            callback(err);
        else {
            util.log(util.inspect(doc));
            doc.remove();
            callback(null);
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
exports.allStores = function(callback) {
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
    JiaxiaoOrderStore.findOne(findObj,function(err,doc){
        if (err) {
            callback(err, null);
        }
        callback(null, doc);
    });
}



