/**
 * Created by guoqing.wen on 2016/1/3.
 */

//所有属性及值列表
exports.allPrpos = function(obj) {
    // 用来保存所有的属性名称和值
    var props = [];
    // 开始遍历
    for(var p in obj){
        // 方法
        if(typeof(obj[p])=="function"){
            obj[p]();
        }else{
            // p 为属性名称，obj[p]为对应属性的值
            props.push({p:obj[p]});
        }
    }
    return props;
}

//所有属性及值列表
exports.allPrpoValues = function(obj) {
    // 用来保存所有的属性名称和值
    var props = "";
    // 开始遍历
    for(var p in obj){
        // 方法
        if(typeof(obj[p])=="function"){
            obj[p]();
        }else{
            // p 为属性名称，obj[p]为对应属性的值
            props+= p + "=" + obj[p]+"<br />";
        }
    }
    // 最后显示所有的属性
    return props  ;
}