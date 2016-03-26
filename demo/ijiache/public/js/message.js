/**
 * Created by wenguoqing on 2016/3/25.
 */
function responseMsg(data){
    if (data){
        if (data.ret == 1){
            setSuccMsg(data.msg);
            return data.msg;
        }
        else {
            setErrMsg(data.msg);
        }
    }
    return null;
}

function setErrMsg(msg){
    $('#errdiv').show();
    $('#errdiv>p').html(msg);
    $('#succdiv').hide();
    setTimeout(function () {
        $('#errdiv').hide();
        $('#succdiv').hide();
    }, 3000);
}

function setSuccMsg(msg){
    $('#succdiv').show();
    $('#succdiv>p').html(msg);
    $('#errdiv').hide();
    setTimeout(function () {
        $('#errdiv').hide();
        $('#succdiv').hide();
    }, 3000);
}
/*
<div id="errdiv" class="alert alert-error" style="display:none">

    <button class="close" data-dismiss="alert"></button>

    <p></p>

    </div>

    <div id="succdiv" class="alert alert-success" style="display:none">

    <button class="close" data-dismiss="alert"></button>

    <p></p>
    </div>
    */