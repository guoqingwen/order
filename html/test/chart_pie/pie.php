<?php
include_once('connect.php');
$res = mysql_query("select * from chart_pie");
while($row = mysql_fetch_array($res)){
	if($row['id']==1){
		$arr1[] = array(
			"name" =>  $row['title'],
			"y" => intval($row['pv']),
			"sliced" => true,
			"selected" => true
		); 
	}else{
		$arr[] = array(
		    $row['title'],intval($row['pv'])
	    );
	}
}
//合并数组
$arrs = array_merge($arr1,$arr);
$data = json_encode($arrs);
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="keywords" content="图表, 饼状图, jquery, JSON" />
<meta name="description" content="Helloweba演示平台，演示XHTML、CSS、jquery、PHP案例和示例" />
<title>使用Highcharts结合PHP与Mysql生成饼状图-Helloweba演示平台</title>
<link rel="stylesheet" type="text/css" href="../css/main.css" />
<style type="text/css">
.demo{width:600px; margin:10px auto}
.myclass{border:1px solid #000; background:#ccc; color:#fff}
</style>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
<script type="text/javascript" src="js/highcharts.js"></script>
<script type="text/javascript" src="js/modules/exporting.js"></script>
<script type="text/javascript">
var chart;
$(function() {
	chart = new Highcharts.Chart({
        chart: {
            renderTo: 'chart_pie',  //饼状图关联html元素id值
			defaultSeriesType: 'pie', //默认图表类型为饼状图
			plotBackgroundColor: '#ffc',  //设置图表区背景色
            plotShadow: true   //设置阴影
        },
        title: {
            text: '搜索引擎统计分析'  //图表标题
        },
		credits: {
			text: 'helloweba.com'
		},
        tooltip: {
            formatter: function() { //鼠标滑向图像提示框的格式化提示信息
                return '<b>' + this.point.name + '</b>: ' + twoDecimal(this.percentage) + ' %';
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true, //允许选中，点击选中的扇形区可以分离出来显示
                cursor: 'pointer',  //当鼠标指向扇形区时变为手型（可点击）
				//showInLegend: true,  //如果要显示图例，可将该项设置为true
                dataLabels: {
                    enabled: true,  //设置数据标签可见，即显示每个扇形区对应的数据
                    color: '#000000',  //数据显示颜色
                    connectorColor: '#999',  //设置数据域扇形区的连接线的颜色
					style:{
						fontSize: '12px'  //数据显示的大小
					},
                    formatter: function() { //格式化数据
                        return '<b>' + this.point.name + '</b>: ' + twoDecimal(this.percentage) + ' %';
					    //return '<b>' + this.point.name + '</b>: ' + this.y ;
                    }
                }
            }
        },
        series: [{ //数据列
            name: 'search engine',
			data: <?php echo $data;?> //核心数据列来源于php读取的数据并解析成JSON
        }]
    });
});
//保留2位小数
function twoDecimal(x) {
    var f_x = parseFloat(x);
    if (isNaN(f_x)) {
        alert('错误的参数');
        return false;
    }
    var f_x = Math.round(x * 100) / 100;
    var s_x = f_x.toString();
    var pos_decimal = s_x.indexOf('.');
    if (pos_decimal < 0) {
        pos_decimal = s_x.length;
        s_x += '.';
    }
    while (s_x.length <= pos_decimal + 2) {
        s_x += '0';
    }
    return s_x;
}
</script>
</head>

<body>
<div id="header">
   <div id="logo"><h1><a href="http://www.helloweba.com" title="返回helloweba首页">helloweba</a></h1></div>
</div>

<div id="main">
  <h2 class="top_title"><a href="http://www.helloweba.com/view-blog-159.html">使用Highcharts结合PHP与Mysql生成饼状图</a></h2>
  
<div id="chart_pie" class="demo"></div>


<div class="google_ad">
<script type="text/javascript">
google_ad_client = "ca-pub-7515443544894528";google_ad_slot = "3438097725";google_ad_width = 728;google_ad_height = 90;
</script>
<script type="text/javascript" src="http://pagead2.googlesyndication.com/pagead/show_ads.js"></script>
<br/>
</div>
</div>
<div id="footer">
    <p>Powered by helloweba.com  允许转载、修改和使用本站的DEMO，但请注明出处：<a href="http://www.helloweba.com">www.helloweba.com</a></p>
</div>
<p id="stat"><script type="text/javascript" src="http://js.tongji.linezing.com/1870888/tongji.js"></script></p>
</body>
</html>
