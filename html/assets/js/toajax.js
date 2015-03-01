function test()
{
  	var myobj = {
		"Ret":0,
		"Msg":{
		"10001":{"name":"杜蕾斯3片装","type":"安全套","infoUrl":"test.htm","describe":"discribe","price":"20.0","ico":"goods/10001.jpg"},
		"10002":{"name":"杜蕾斯12片装","type":"安全套","infoUrl":"test.htm","describe":"杜蕾斯12片装","price":"998","ico":"goods/10002.jpg"}
		}};  
	 var types = {"安全套":"1000","跳蛋":"1001","震动棒":"1002","润滑剂":"1003","试孕纸":"1004"};  
     if(myobj.Ret != 0)
     {
		alert("获取数据错误");
		return;
     }
     var goodUrl = "";
     var goodLiStr = "";
     var goodType;
     var imageUrl;
     var buyUrl = "#";
     var goodUl = document.getElementById("dataList");
     var list;
     myobj = myobj.Msg;
     var hr;
     hr = document.createElement("hr");
     goodUl.appendChild(hr);
     for(var goodId in myobj)
     {
     	goodType = myobj[goodId].type;
     	goodUrl = myobj[goodId].infoUrl+"?goodId="+goodId+"&classify="+types[goodType]+"&price="+myobj[goodId].price+"&goodName="+myobj[goodId].name;
     	imageUrl = myobj[goodId].ico;
     	var goodsName = '['+myobj[goodId].name +'] ' +myobj[goodId].describe;
        var contentStr = "<div id='content_div'><div><a  target='_blank' href='"+goodUrl
        +"'><img src='"+imageUrl+
        "'/></a></div><div class='content_description'><a  target='_blank' href ='"+goodUrl
        +"'>"+goodsName+"</a><br/><span id='priceSpan'>￥"+myobj[goodId].price+"</span></div></div>";

        list = document.createElement("li");
		list.innerHTML = contentStr;
     	goodUl.appendChild(list);
        hr = document.createElement("hr");
        goodUl.appendChild(hr);
     }
}
  
/*
 url: 调用的url链接
 onComplete: 回调函数  当为number时 不调用
*/
function toAjax(url, onComplete)
{
	/* url f is Number 回调函数 */

    var JSONP=document.createElement("script");  
    JSONP.type="text/javascript";  

    if( onComplete == null )
	{
		onComplete = 0;
	}
    if( url.indexOf("?") == -1 )
    {
    	url += "?f="+onComplete;
    }
    else
    {
    	url += "&f="+onComplete;
    }
   
    JSONP.src = url;  
    document.body.appendChild(JSONP);  
}

//获取主页数据
function loadIndex(id)
{
	var url ="http://m.eelebuy.com/shoping/getShoping?classify="+id;   
    toAjax(url, "loadIndexResponse");
}
function loadIndexResponse(originalRequest) 
{   
	//套 1000 跳 1001 棒 1002  润滑剂 1003 纸 1004
   
    var myobj = originalRequest;//JSON.stringify(originalRequest);  
	var goodUl = document.getElementById("dataList");
     if(String(myobj.Ret) != "0")
     {
		alert("获取数据错误");
		//goodUl.innerHTML = "<p>"+获取数据错误+"</p>";
		return;
     }
    var children = goodUl.childNodes;
    while(children.length>0)
    {
        goodUl.removeChild(children[0]);
    }
   
     var goodUrl = "";
     var goodLiStr = "";
     var imageUrl;
     var list;
     var buyUrl ;
     
     myobj = myobj.Msg;
     var hr;
     hr = document.createElement("hr");
        goodUl.appendChild(hr);
     for(var goodId in myobj)
     {
        buyUrl = myobj[goodId].infoUrl;
        //buyUrl = getBuyURL(buyUrl);
        goodUrl = "goodInfo.htm?goodInfoUrl="+buyUrl+"&goodId="+goodId;
        imageUrl = myobj[goodId].ico;

        var goodsName = '['+myobj[goodId].name +'] ' ;//+myobj[goodId].describe;
        var imgClick = 'enterIndent(\''+myobj[goodId].name+'\','+goodId+','+myobj[goodId].price+')';
       /* var contentStr = "<div id='content_div'><div><a  target='_blank' href='"+goodUrl
        +"'><img id='goodImg' src='"+imageUrl+
        "'/></a></div><div class='content_description'><a  target='_blank' href ='"+goodUrl
        +"'>"+goodsName+"</a><br/><span id='priceSpan'>￥"+myobj[goodId].price+"</span><br> <img id='buyImg' src='../images/buybtn.png' /></div></div>";
        */

         var contentStr = '<div id="content_div"><div><a  target="_blank" href="'+goodUrl
        +'"><img id="goodImg" src="'+imageUrl+
        '"/></a></div><div class="content_description"><a  target="_blank" href ="'+goodUrl
        +'">'+goodsName+'</a><br/><span id="priceSpan">￥'+myobj[goodId].price+'</span><br><a href="#" onclick="'+imgClick+'"> <img id="buyImg" src="../images/buybtn.png" /></a></div></div>';
        //<div class='content_buy'><img src='../images/buybtn.png' /></div>
        list = document.createElement("li");
        list.innerHTML = contentStr;
        goodUl.appendChild(list);
        hr = document.createElement("hr");
        goodUl.appendChild(hr);
     }
}  
function getBuyURL(url)
{
    var index = url.lastIndexOf(".htm");
    var tmp = url.substring(0,index);
    return tmp +"m.htm";
}
/*  */
function enterIndent(goodName,id,onePrice,count)
{
	//alert("yes");
    var tmp = 1;
    if(count)
    {
        tmp = count;
    }
	window.location.href = "sumIndent.html?goodName="+goodName+"&id="+id+"&onePrice="+onePrice+"&count="+tmp;
	
}




//查询订单
function selectIndent(formId)
{
	var form = document.getElementById(formId);
	var tel = form.tel.value;
	var url ="http://api.eelebuy.com/order/look?tel="+tel; 
	toAjax(url, "onResultSelect");
}

function onResultSelect(result)
{

}

function getCookie(name)
{ 
    var strCookie=document.cookie; 
    var arrCookie=strCookie.split("; "); 
    for(var i=0;i<arrCookie.length;i++){ 
        var arr=arrCookie[i].split("="); 
        if(arr[0]==name)return arr[1]; 
    } 
    return ""; 
} 



