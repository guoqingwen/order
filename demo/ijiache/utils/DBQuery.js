/**
 * Created by guoqing.wen on 2016/1/3.
 * 多表数据库查询帮助类
 */

/**
 * findFunc为表的查询函数
 * findObj为查询条件对象
 * targetObj为设置的属性对象
 * attrObj为要设置的属性列表键值对，格式为{targetObj.属性名: find结果:属性名}
 * */
require('date-utils');
var DateUtils = require('../utils/DateUtils');
var ObjectType = require('../utils/ObjectType');
exports.query = function(findFunc, findObj, targetObj, attrObj, completeCallback){
    findFunc(findObj, function(err, doc){
        //console.log("exports.query:",typeof(doc),doc);
        var hasData = false;
        if(ObjectType.isArray(doc)){
            for(var i = doc.length - 1; i >= 0; i--){
                var data = doc[i];
                //console.log("query:",data);
                // 开始遍历
                for(var p in attrObj){
                    if(p.indexOf("Time") != -1){
                        targetObj[p] = DateUtils.dateToTimeStr(data[attrObj[p]]);
                    }
                    else if(p.indexOf("Date") != -1){
                        targetObj[p] = DateUtils.dateToYearStr(data[attrObj[p]]);
                    }
                    else{
                        targetObj[p] = data[attrObj[p]];
                    }
                }
                hasData = true;
            }
        }
        else{
            hasData = true;
            // 开始遍历
            for(var p in attrObj){
                if(p.indexOf("Time") != -1){
                    targetObj[p] = DateUtils.dateToTimeStr(doc[attrObj[p]]);
                }
                else if(p.indexOf("Date") != -1){
                    targetObj[p] = DateUtils.dateToYearStr(doc[attrObj[p]]);
                }
                else{
                    targetObj[p] = doc[attrObj[p]];
                }
            }
        }
        completeCallback(hasData);
    });
}