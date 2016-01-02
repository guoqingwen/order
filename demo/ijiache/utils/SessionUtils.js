/**
 * Created by guoqing.wen on 2016/1/1.
 */

exports.sessionError = function(req, errmsg){
    return req.session.errmsg = errmsg;
}

exports.sessionMsg = function(req, msg){
    return req.session.message = msg;
}