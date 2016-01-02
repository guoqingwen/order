/**
 * Created by guoqing.wen on 2016/1/1.
 */
var gettype = Object.prototype.toString;

exports.isObj = function(o){

        return    gettype.call(o)=="[object Object]";

    }

exports.isArray = function(o){

        return    gettype.call(o)=="[object Array]";

    },
exports.isNULL = function(o){

        return    gettype.call(o)=="[object Null]";

    }

exports.isDocument = function(){

        return gettype.call(o)=="[object Document]" || "[object HTMLDocument]";

    }
