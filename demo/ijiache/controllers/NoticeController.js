/**
 *  通知控制类.
 *  用于通知用户，微信公众账号，以及短信
 * Created by guoqing.wen on 2016/1/5.
 *
 */
var notices = [];
exports.clearNotice = function(){
    notices = [];
}

exports.sendNotice = function(){
    notices = [];
}

exports.addNotice = function(userId, notice){

}

//用户取消课程报名，通知管理员
exports.addUserCancelNotice = function(userId, classId, orderDate){

}

//用户收到预约成功反馈给管理员，通知管理员
exports.addUserEnterNotice = function(userId, classId, orderDate){

}

//管理员添加预约确定消息
exports.addOrderEnterNotice = function(userId, title, orderDate, startTime, endTime, notice){

}

//管理员添加预约取消消息
exports.addOrderCancalNotice = function(userId, title, orderDate, startTime, endTime,  notice){

}