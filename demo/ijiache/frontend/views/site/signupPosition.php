<style type="text/css">
#map_container {width: 100%;height: 300px;border: 1px solid #999;margin:0;font-family:"微软雅黑";}
</style>
<script type="text/javascript" src="http://api.map.baidu.com/api?v=1.4"></script>
<script type="text/javascript" src="http://api.map.baidu.com/library/SearchControl/1.4/src/SearchControl_min.js"></script>
<link rel="stylesheet" href="http://api.map.baidu.com/library/SearchControl/1.4/src/SearchControl_min.css" />
<link href="http://api.map.baidu.com/library/TrafficControl/1.4/src/TrafficControl_min.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="http://api.map.baidu.com/library/TrafficControl/1.4/src/TrafficControl_min.js"></script>

<?php

/* @var $this yii\web\View */
/* @var $form yii\bootstrap\ActiveForm */
/* @var $model \frontend\models\SignupForm */

$this->title = '营业点注册';
$this->params['breadcrumbs'][] = ['label' => '注册类型', 'url' => '?r=site/signup'];
$this->params['breadcrumbs'][] = $this->title;
?>
   <form method="post" class="am-form am-form-horizontal" action="?r=site/position">
   <input type="hidden" name="_csrf" value='<?php Yii::$app->getRequest()->csrfParam; ?>'/>
	<div class="am-form-group">
		  <label for="number"  class="am-u-sm-2 am-form-label">营业点编号:</label>
		  <div  class="am-u-sm-10"><input type="text" name="SignupPositionForm[number]" id="number" disabled="disabled" value="<?php echo $model->number ?>"></div>
	</div>
	
	<div class="am-form-group">
		  <label for="email"  class="am-u-sm-2 am-form-label">邮箱:</label>
		  <div  class="am-u-sm-10"><input type="email" name="SignupPositionForm[email]" id="email" value=""></div>
	</div>
	<div class="am-form-group">
       <input type="hidden" name="SignupPositionForm[city]" value='1,1,1'/>
		<label for="email"  class="am-u-sm-2 am-form-label">城市:</label>
		<div id="id_city" class="am-u-sm-10 am-form-inline">
			<div class="am-form-group"><select class="prov"></select> </div>
			<div class="am-form-group"><select class="city" disabled="disabled"></select></div>
			<div class="am-form-group"><select class="dist" disabled="disabled"></select></div>
		</div>
		
	</div>
	<div class="am-form-group">
		<label for="s_id"  class="am-u-sm-2 am-form-label">驾校:</label>
		<div id="id_school" class="am-u-sm-5">
			<select name="SignupPositionForm[s_id]" class="prov" >
			     <option value ="1">港安驾校</option>
                  <option value ="2">深港驾校</option>
                  <option value="3">综安驾校</option>
                  <option value="4">南山驾校</option>
			</select> 
			
		</div>
		<div  class="am-u-sm-5">
		  <h2>找不到驾校？<a href="?r=site/addpos">点此添加</a></h2>
		</div>
	</div>
	<div class="am-form-group" >
		<label for="name"  class="am-u-sm-2 am-form-label">店面名称:</label>
		<div  class="am-u-sm-10"><input type="text" name="SignupPositionForm[name]" id="name" placeholder="店面名称"  value=""></div>
	</div>
	<div class="am-form-group" >
		<label for="phone_name"  class="am-u-sm-2 am-form-label">联系人姓名:</label>
		<div  class="am-u-sm-10"><input type="text" name="SignupPositionForm[phone_name]" id="phone_name" placeholder="输入联系人姓名"  value=""></div>
	</div>
	<div class="am-form-group" >
		<label for="phone"  class="am-u-sm-2 am-form-label">联系人手机:</label>
		<div  class="am-u-sm-10"><input type="text" name="SignupPositionForm[phone]" id="phone" placeholder="输入联系人手机号码"  value=""></div>
	</div>
	<div class="am-form-group" >
		<label for="cell"  class="am-u-sm-2 am-form-label">座机号码:</label>
		<div  class="am-u-sm-10"><input type="text" name="SignupPositionForm[cell]" id="cell" placeholder="店面名称"  value=""></div>
	</div>
	<div class="am-form-group" >
		<label for="address"  class="am-u-sm-2 am-form-label">详细地址:</label>
		<div  class="am-u-sm-10"><input type="text" name="SignupPositionForm[address]" id="address" placeholder="输入详细地址"  value=""></div>
	</div>
	<div class="am-form-group" >
		<label for="address_pos"  class="am-u-sm-2 am-form-label">地图选点:</label>
		<div  class="am-u-sm-10"><input type="text" name="SignupPositionForm[position]" id="address_pos" placeholder="地图选点" value=""></div>
	</div>
	<div class="am-form-group" >
		<label class="am-u-sm-2 am-form-label"></label>
		
		<div id="box01" class="am-u-sm-10">
			<div id="searchBox"></div>
			<div id="map_container"></div>
		</div> 
	</div>
	<div class="am-form-group" >
		<label for="home_image"  class="am-u-sm-2 am-form-label">图标:</label>
		<div  class="am-u-sm-10"><input type="file" name="home_image" id="home_image" placeholder="图标文件"  value="admin"></div>
	</div>
	<div class="am-form-group" >
		<label for="username"  class="am-u-sm-2 am-form-label">登陆账户:</label>
		<div  class="am-u-sm-10"><input type="text" name="SignupPositionForm[username]" id="username" placeholder="登陆账户"  value="admin"></div>
	</div>
	<div class="am-form-group" >
		<label for="password"  class="am-u-sm-2 am-form-label">登陆密码:</label>
		<div  class="am-u-sm-10"><input type="text" name="SignupPositionForm[password]" id="password" placeholder="登陆密码"  value="admin"></div>
	</div>
	<div class="am-form-group" >
		<label for="qq"  class="am-u-sm-2 am-form-label">常用QQ:</label>
		<div  class="am-u-sm-10"><input type="text" name="SignupPositionForm[qq]" id="qq" placeholder="输入qq号码"  value=""></div>
	</div>
	<div class="am-form-group" >
		<label for="car_instruction"  class="am-u-sm-2 am-form-label">学车说明:</label>
		<div  class="am-u-sm-10"><textarea name="SignupPositionForm[car_instruction]" cols="10" rows="5"></textarea></div>
	</div>
	<div class="am-form-group" >
		<label for="car_remark"  class="am-u-sm-2 am-form-label">学车备注:</label>
		<div  class="am-u-sm-10"><textarea name="SignupPositionForm[car_remark]" cols="10" rows="5"></textarea></div>
	</div>
	
	<div class="am-form-group" >
		<label class="am-u-sm-2 am-form-label"></label>
		<div  class="am-u-sm-10">
		<input type="submit" value="提 交" class="am-btn am-btn-primary am-btn-sm am-fl">
		<input type="reset" value="重 置" class="am-btn am-btn-default am-btn-sm am-fr">
		</div>
	</div>
</form>
<script type="text/javascript">

$(function(){
	$("#id_city").citySelect({
    	prov:"广东", 
    	city:"深圳",
		dist:"南山区",
		nodata:"none"
	}); 
	
});

</script>
<script type="text/javascript">

	// 创建地图对象并初始化
	var mp = new BMap.Map("map_container",{
		enableHighResolution: true //是否开启高清
	});
	//113.950673,22.554198
	var point = new BMap.Point(113.950, 22.554);
	mp.centerAndZoom(point, 14); //初始化地图
	mp.enableInertialDragging(); //开启关系拖拽
	mp.enableScrollWheelZoom();  //开启鼠标滚动缩放
	mp.setCurrentCity("深圳");
	// 添加定位控件
	var geoCtrl = new BMap.GeolocationControl({
		showAddressBar       : true //是否显示
		, enableAutoLocation : false //首次是否进行自动定位
		, offset             : new BMap.Size(0,25) 
		//, locationIcon     : icon //定位的icon图标
	});

	//监听定位成功事件
	geoCtrl.addEventListener("locationSuccess",function(e){
		var address = geoCtrl.getAddressComponent();
		console.log(e);
	});

	//监听定位失败事件
	geoCtrl.addEventListener("locationError",function(e){
			console.log(e);
	});

	// 将定位控件添加到地图
	mp.addControl(geoCtrl);

	//检索类型
	var type = LOCAL_SEARCH ;   //周边检索
	//type = TRANSIT_ROUTE; //公交检索
	//type = DRIVING_ROUTE; //驾车检索

	//创建鱼骨控件
	var navCtrl = new BMap.NavigationControl({
			anchor: BMAP_ANCHOR_TOP_LEFT //设置鱼骨控件的位置
	});
	// 将鱼骨添加到地图当中
	mp.addControl(navCtrl);
	
	var myIcon = new BMap.Icon("markers60.png", new BMap.Size(23, 25), {        
	   offset: new BMap.Size(10, 25),       
	   imageOffset: new BMap.Size(0, 0 - 0 * 25)   // 设置图片偏移    
	 });  
	var point = new BMap.Point(113.950, 22.554);
	document.getElementById("address_pos").value =  point.lng+","+point.lat;		
	mp.centerAndZoom(point, 14);
	var marker = new BMap.Marker(point,{icon: myIcon});// 创建标注
	mp.addOverlay(marker);  
	marker.setLabel('拖动选择位置');	// 将标注添加到地图中
	marker.enableDragging();
	var opts = {
	  width : 50,     // 信息窗口宽度
	  height: 3,     // 信息窗口高度
	  title : "提示：" , // 信息窗口标题
	  enableMessage:false,//设置允许信息窗发送短息
	}
	var geoc = new BMap.Geocoder();    
	var infoWindow = new BMap.InfoWindow("拖动图标选择地址", opts);  // 创建信息窗口对象
	mp.openInfoWindow(infoWindow,getInfoPoint(point)); //开启信息窗口
	marker.addEventListener("dragend", function(e){          
		var point = marker.getPosition();
		setAddressPoint(point);
	});
	function setAddressPoint(point)
	{
		document.getElementById("address_pos").value =  point.lng+","+point.lat;
		mp.openInfoWindow(infoWindow,getInfoPoint(point)); //开启信息窗口
		geoc.getLocation(point, function(rs){
			var addComp = rs.addressComponents;
			var addressStr = addComp.province + "" + addComp.city + "" + addComp.district + "" + addComp.street + "" + addComp.streetNumber
			document.getElementById("address").value = addressStr;
		});
	}
	function getInfoPoint(p)
	{
		return new BMap.Point(p.lng, p.lat+0.003);	
	}
</script>	
