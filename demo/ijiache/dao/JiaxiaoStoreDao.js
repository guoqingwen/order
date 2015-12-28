var util = require('util');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('date-utils');

//定义StoreScheme对象模型
//表示驾校门店
var StoreScheme = new Schema({
    jiaxiaoId:String,//驾校Id
    title:String,//名称
    province:String,//省
    city:String,//城市
    district:String,//区
    address:String,//地址
    contact:String,//联系人名称
    iphone:String,//电话号码
    telephone:String,//座机
    admin:String,//管理员用户名
    adminPwd:String,//管理员密码
    availabled:{type:Boolean,default:true},//是否可用
    availabled_date:{type:Date,default:Date.now},//有效期
    post_date:{type:Date,default:Date.now}//注册日期
});

//访问store对象模型
mongoose.model('t_jiaxiao_store', StoreScheme);
var JiaxiaoStore = mongoose.model('t_jiaxiao_store');

exports.add = function(jiaxiaoId, title, province, city, district, address, contact, iphone, telephone, admin, adminPwd, callback) {
    var now = new Date();
    now.add({years: 1});
    var newStore = new JiaxiaoStore();
    newStore.jiaxiaoId = jiaxiaoId;
    newStore.title = title;
    newStore.province = province;
    newStore.city = city;
    newStore.district = district;
    newStore.address = address;
    newStore.contact = contact;
    newStore.iphone = iphone;
    newStore.telephone = telephone;
    newStore.admin = admin;
    newStore.adminPwd = adminPwd;
    newStore.availabled_date = now.getTime();//默认1年有效期
    newStore.save(function(err){
        if(err){
            util.log("FATAL"+err);
            callback(err);
        }else{
            callback(null);
        }
    });
}

exports.delete = function(id, callback) {
    exports.findStoreById(id, function(err, doc) {
        if (err)
            callback(err);
        else {
            util.log(util.inspect(doc));
            doc.remove();
            callback(null);
        }
    });
}

/** 修改门店信息 */
exports.editStore = function(id, title, province, city, district, address, contact, iphone, telephone, admin, adminPwd, callback) {
    exports.findStoreById(id, function(err, doc) {
        if (err)
            callback(err);
        else {
            doc.title = title;
            doc.province = province;
            doc.city = city;
            doc.district = district;
            doc.address = address;
            doc.contact = contact;
            doc.iphone = iphone;
            doc.telephone = telephone;
            doc.admin = admin;
            doc.adminPwd = adminPwd;

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

/** 编缉否禁用该门店 */
exports.editAvailabled = function(id, availabled, callback) {
    exports.findStoreById(id, function(err, doc) {
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
    exports.findStoreById(id, function(err, doc) {
        if (err)
            callback(err);
        else {
            callback(null, doc.availabled);
        }
    });
}

/** 获取驾校所有门店  */
exports.getStoreByJiaxiao = function(jiaxiaoId, callback) {
    JiaxiaoStore.findOne({jiaxiaoId:jiaxiaoId}, callback);
}

/**获取所有门店列表*/
exports.allStores = function(callback) {
    JiaxiaoStore.find({}, callback);
}

exports.forAll = function(doEach, done) {
    JiaxiaoStore.find({}, function(err, docs) {
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

var findStoreById = exports.findStoreById = function(id,callback){
    JiaxiaoStore.findOne({_id:id},function(err,doc){
        if (err) {
            util.log('FATAL '+ err);
            callback(err, null);
        }
        callback(null, doc);
    });
}

var findStoreByAdmin = exports.findStoreByAdmin = function(admin,callback){
    JiaxiaoStore.findOne({admin:admin},function(err,doc){
        if (err) {
            util.log('FATAL '+ err);
            callback(err, null);
        }
        callback(null, doc);
    });
}



