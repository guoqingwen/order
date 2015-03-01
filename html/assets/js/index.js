function gotoLogin()
{
	window.location.href="login.html"; 
}
function sidebar_orderfunc()
{
	getIFrame().src = "fullcalendar/index.html";
}
function sidebar_userfunc()
{
	getIFrame().src = "admin-user.html";
}
function sidebar_passwordfunc()
{
	getIFrame().src = "admin-password.html";
}
function sidebar_positionfunc()
{
	getIFrame().src = "admin-position.html";
}

function getIFrame()
{
	return document.getElementById("id_frame");
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



