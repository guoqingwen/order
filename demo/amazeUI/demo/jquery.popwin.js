/* 
* jquery.popwin.js 1.0 
* Copyright (c) gaoyubao 
* Date: 2012-01-12 
* 1.�����ť�����Ե������뵯�������ݣ�ֻҪ����һ��id,����class 
2.�����������С��ʱ�򣬵�����ʼ���Ǿ��е� 
3.��ESC�䣬���Թرմ��� 
*/ 
(function($) { 
var css='<style type="text/css">* {margin: 0;padding: 0;}#bg{background-color: #000; position: absolute; left:0; top:0;opacity: 0.5;filter:alpha(opacity=50);} #flagBox {position: absolute;border: 1px solid #000;background-color: #fff;z-index:2000;}#titleBox {padding: 5px;background-color:#fc0; overflow:hidden;} #titleBox p {font-weight: bold;} #titleBox a {float: right;} #htmlCode {padding: 10px;} span {font-size: 12px; color: #f00; margin-left: 10px;}</style>'; 
$("head").append(css); 
$.fn.popwin= function(options) { 
var settings={ 
element: "element", //��һ�������򣬿�����id��������class 
width: 400, 
height: 200, 
title: "title" //�������title 
} 
var s=$.extend(settings,options); 
var htmlCode=$(s.element).html(); 
$(s.element).remove(); 
$.a={ 
//���ñ����Ŀ�͸� 
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
//���õ�������� 
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
//������ر� 
setClose: function() { 
$("#container").remove(); 
} 
}; 
var html='<div id="container"><div id="bg"></div><div id="flagBox"><div id="titleBox"><a href="javascript:void(0)">close</a><p>'+s.title+'</p></div><div id="htmlCode">'+htmlCode+'</div></div></div>'; 
$(window).resize(function() {//���ⴰ�ڵĴ�С 
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
$("#nameErr").html("��������Ϊ��"); 
flag=false; 
} 
if(password=="") { 
$("#passwordErr").html("���벻��Ϊ��"); 
flag=false; 
} 
if(email=="") { 
$("#emailErr").html("���䲻��Ϊ��"); 
flag=false; 
}else if(isEmail(email)) { 
$("#emailErr").html("�����ʽ����"); 
flag=false; 
} 
return flag; 
} 
