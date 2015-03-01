<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="keywords" content="说说,php,jquery" />
<meta name="description" content="Helloweba演示平台，演示XHTML、CSS、jquery、PHP案例和示例" />
<title>jQuery倒计时</title>
<link rel="stylesheet" type="text/css" href="../css/main.css" />
<style type="text/css">
.demo{width:700px; margin:30px auto}
.times{height:80px; width:320px; margin:0 auto; background:url(images/clock.jpg) no-repeat; padding-left:50px}
.times p{height:20px; line-height:20px;}
.endtime{font-size:20px; font-family:"Microsoft Yahei"; color:#000}
.prolist{margin:10px auto}
.prolist li{float:left; width:320px; height:240px; margin:10px; font-size:14px; position:relative}
.prolist li img{width:320px; height:198px;}
.showtime{position:absolute; top:174px; height:24px; line-height:24px; background:#333; color:#fff; opacity:.6; display:none}
</style>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script type="text/javascript">
var serverTime = <?php echo time();?> * 1000;
$(function(){
    var dateTime = new Date();
    var difference = dateTime.getTime() - serverTime;
	
    setInterval(function(){
      $(".endtime").each(function(){
        var obj = $(this);
        var endTime = new Date(parseInt(obj.attr('value')) * 1000);
        var nowTime = new Date();
        var nMS=endTime.getTime() - nowTime.getTime() + difference;
        var myD=Math.floor(nMS/(1000 * 60 * 60 * 24));
        var myH=Math.floor(nMS/(1000*60*60)) % 24;
        var myM=Math.floor(nMS/(1000*60)) % 60;
        var myS=Math.floor(nMS/1000) % 60;
        var myMS=Math.floor(nMS/100) % 10;
        if(myD>= 0){
			var str = myD+"天"+myH+"小时"+myM+"分"+myS+"."+myMS+"秒";
        }else{
			var str = "已结束！";	
		}
		obj.html(str);
      });
    }, 100);
	
	
	$(".prolist li img").each(function(){
		var img = $(this);
		img.hover(function(){
			img.next().show();
		},function(){
			img.next().hide();
		});
	});
});
</script>
</head>

<body>
<div id="header">
   <div id="logo"><h1><a href="http://www.helloweba.com" title="返回helloweba首页">helloweba</a></h1></div>
</div>

<div id="main">
  <h2 class="top_title"><a href="http://www.helloweba.com/view-blog-182.html">jQuery倒计时</a></h2>
  <div class="demo">
     <div class="times">
        <p>距离2012年12月21日还有</p>
        <div class="endtime" value="1356019200"></div>
     </div>
     
     <ul class="prolist">
         <li><img src="images/p1.jpg" />简约时尚皮带男士手表一款69元<p class="endtime showtime" value="1354365003"></p></li>
         <li><img src="images/p2.jpg" />高强度无毒树脂材料榨汁器24元<p class="endtime showtime" value="1350748800"></p></li>
         <li><img src="images/p3.jpg" />茶香番茄/乌梅/杨梅0.48元<p class="endtime showtime" value="1346487780"></p></li>
         <li><img src="images/p4.jpg" />沙滩鞋男士户外凉鞋69元<p class="endtime showtime" value="1367380800"></p></li>
     </ul>
     <div style="clear:both"></div>
  </div>
</div>
<div id="footer">
    <p>Powered by helloweba.com  允许转载、修改和使用本站的DEMO，但请注明出处：<a href="http://www.helloweba.com">www.helloweba.com</a></p>
</div>
<p id="stat"><script type="text/javascript" src="http://js.tongji.linezing.com/1870888/tongji.js"></script></p>
</body>
</html>
