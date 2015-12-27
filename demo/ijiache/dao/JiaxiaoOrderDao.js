/** 报名表 */
var util = require('util');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('date-utils');

//定义OrderScheme对象模型
//表示学员报名课程表
var OrderScheme = new Schema({
    classId:String,//课程id
    userId:String,//用户id
    orderDate:{type:Date,default:Date.now},//开始日期
    notice:String,//说明备注，会通知到管理员
});

//访问class对象模型
mongoose.model('t_jiaxiao_order_store', StoreScheme);
var JiaxiaoOrderStore = mongoose.model('t_jiaxiao_order_store');

//添加报名
exports.add = function(storeId, title, startTime, endTime, startDate, endDate, allUsed, notice, callback) {
    var newClass = new JiaxiaoOrderStore();
    newClass.title = title;
    newClass.storeId = storeId;
    newClass.startTime = startTime;
    newClass.startDate = startDate;
    newClass.endDate = endDate;
    newClass.endTime = endTime;
    newClass.allUsed = allUsed;

    newClass.save(function(err){
        if(err){
            util.log("FATAL"+err);
            callback(err);
        }else{
            callback(null);
        }
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
exports.editClass = function(id, storeId, title, startTime, endTime, startDate, endDate, allUsed, notice, callback) {
    exports.findOneById(id, function(err, doc) {
        if (err)
            callback(err);
        else {
            doc.title = title;
            doc.storeId = storeId;
            doc.startTime = startTime;
            doc.startDate = startDate;
            doc.endDate = endDate;
            doc.endTime = endTime;
            doc.allUsed = allUsed;

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

/** 编缉否禁用该课程 */
exports.editAvailabled = function(id, availabled, callback) {
    exports.findOneById(id, function(err, doc) {
        if (err)
            callback(err);
        else {
            doc.availabled = availabled;
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

/** 是否可用 */
exports.availabled = function(id, callback) {
    exports.findOneById(id, function(err, doc) {
        if (err)
            callback(err);
        else {
            callback(null, doc.availabled);
        }
    });
}

/**获取所有门店列表*/
exports.allStores = function(callback) {
    JiaxiaoClassStore.find({}, callback);
}

exports.forAll = function(doEach, done) {
    JiaxiaoClassStore.find({}, function(err, docs) {
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
    JiaxiaoClassStore.findOne({_id:id},function(err,doc){
        if (err) {
            util.log('FATAL '+ err);
            callback(err, null);
        }
        callback(null, doc);
    });
}



