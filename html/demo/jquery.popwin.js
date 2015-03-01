/* 
* jquery.popwin.js 1.0 
* Copyright (c) gaoyubao 
* Date: 2012-01-12 
* 1.点击按钮，可以弹出你想弹出的内容，只要设置一下id,或者class 
2.浏览器窗口缩小的时候，弹出框始终是居中的 
3.按ESC间，可以关闭窗口 
*/ 
(function($) { 
var css='<style type="text/css">* {margin: 0;padding: 0;}#bg{background-color: #000; position: absolute; left:0; top:0;opacity: 0.5;filter:alpha(opacity=50);} #flagBox {position: absolute;border: 1px solid #000;background-color: #fff;z-index:2000;}#titleBox {padding: 5px;background-color:#fc0; overflow:hidden;} #titleBox p {font-weight: bold;} #titleBox a {float: right;} #htmlCode {padding: 10px;} span {font-size: 12px; color: #f00; margin-left: 10px;}</style>'; 
$("head").append(css); 
$.fn.popwin= function(options) { 
var settings={ 
element: "element", //哪一个弹出框，可以是id，或者是class 
width: 400, 
height: 200, 
title: "title" //弹出框的title 
} 
var s=$.extend(settings,options); 
var htmlCode=$(s.element).html(); 
$(s.element).remove(); 
$.a={ 
//设置背景的宽和高 
setBg: function() { 
var bh=$("body").height(),wh=$(window).height(),ww=$(window).width(); 
if(bh>wh) { 
wh=bh; 
} 
$("#bg").css({ 
width: ww, 
height: wh 
}); 
}, 
//设置弹出框居中 
setFlag: function() { 
var l=(document.documentElement.clientWidth-s.width)/2+"px", 
t=(document.documentElement.clientHeight-s.height)/2+"px"; 
$("#flagBox").css({ 
width: s.width, 
height: s.height, 
left: l, 
top: t 
}); 
}, 
//弹出框关闭 
setClose: function() { 
$("#container").remove(); 
} 
}; 
var html='<div id="container"><div id="bg"></div><div id="flagBox"><div id="titleBox"><a href="javascript:void(0)">close</a><p>'+s.title+'</p></div><div id="htmlCode">'+htmlCode+'</div></div></div>'; 
$(window).resize(function() {//调解窗口的大小 
$.a.setFlag(); 
}); 
return this.each(function() { 
$(this).bind("click",function(){ 
$("body").append(html); 
$("#titleBox a").click(function() { 
$.a.setClose(); 
}); 
$.a.setBg(); 
$.a.setFlag(); 
}); 
$(document).keydown(function(event) { 
if(event.which=="27") { 
$.a.setClose(); 
} 
}); 
}); 
}; 
})(jQuery) 
function isEmail(str) { 
var reg = /^([a-zA-Z0-9_-])+@+([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])/; 
if(reg.exec(str)) { 
return false; 
}else { 
return true; 
} 
} 
function check() { 
var flag=true; 
$("#nameErr").html(''); 
$("#passwordErr").html(''); 
$("#emailErr").html(''); 
var username=$("#username").val(); 
var password=$("#password").val(); 
var email=$("#email").val(); 
if(username=="" || username==null) { 
$("#nameErr").html("姓名不能为空"); 
flag=false; 
} 
if(password=="") { 
$("#passwordErr").html("密码不能为空"); 
flag=false; 
} 
if(email=="") { 
$("#emailErr").html("邮箱不能为空"); 
flag=false; 
}else if(isEmail(email)) { 
$("#emailErr").html("邮箱格式错误"); 
flag=false; 
} 
return flag; 
} 
