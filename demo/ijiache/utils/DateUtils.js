/**
 * Created by guoqing.wen on 2016/1/3.
 */
require('date-utils');

exports.dateToYearStr = function (dateObj) {
    return exports.dateToString(dateObj, 'YYYY-MM-DD');
}

exports.dateToTimeStr = function (dateObj, format){
    return exports.dateToString(dateObj, 'HH24:MI:SS');
}

exports.dateToString = function (dateObj, format){
    return dateObj.toFormat(format);
}