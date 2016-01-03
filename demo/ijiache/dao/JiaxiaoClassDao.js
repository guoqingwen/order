/** 课程表 */
var util = require('util');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('date-utils');

//定义ClassScheme对象模型
//表示驾校发布可报名课程表
var ClassScheme = new Schema({
    title:String,//课程名称
    storeId:String,//门店id
    startTime:{type:Date,default:Date.now},//开始时间
    endTime:{type:Date,default:Date.now},//结束时间
    startDate:{type:Date,default:Date.now},//开始日期
    endDate:{type:Date,default:Date.now},//结束日期
    allUsed:{type:Boolean,default:true},//是否长期有效
    availabled:{type:Boolean,default:true},//是否可用
    notice:String,//说明备注
});

//访问class对象模型
mongoose.model('t_jiaxiao_class_store', ClassScheme);
var JiaxiaoClassStore = mongoose.model('t_jiaxiao_class_store');

exports.add = function(storeId, title, startTime, endTime, startDate, endDate, allUsed, callback) {
    var newClass = new JiaxiaoClassStore();
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

/**获取所有课程列表*/
exports.allClass = function(callback) {
    JiaxiaoClassStore.find({}, callback);
}



/**获取门店发布所有列表*/
exports.allClassBySotreId = function(storeId, callback) {
    JiaxiaoClassStore.find({storeId:storeId}, callback);
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

exports.findOneByObj = function(obj,callback){
    obj = obj || {};
    JiaxiaoClassStore.find(obj,function(err,doc){
        if (err) {
            util.log('FATAL '+ err);
            callback(err, null);
        }
        callback(null, doc);
    });
}


