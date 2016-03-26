/**
 * Created by wenguoqing on 2016/3/25.
 */

var UserInfo = function () {
    return {
        init:function(){
            alert("init");
            $.ajax({
                url:'/userOrderList',
                type:'get',
                data:{},
                success: function (data) {
                    alert(data.orders);
                    var len = data.orders.length;
                    for(var i = 0; i < len; i++){
                        var todo = data.orders[i];
                        var oprateStr = '<a class="btn" href="/store_order/'+todo._id+'/delete">取消</a>';

                        if(todo.userSuccessed){
                            oprateStr += '<strong>已确认</strong>'
                        }
                        else{
                            oprateStr += '<a class="btn" href="/store_order/'+todo._id+'/enter">确认</a>';
                        }

                        var succStr = '';
                        if (todo.successed){
                            succStr += '成功:'+ todo.orderNotice;
                        }
                        else{
                            succStr += '否';
                        }

                        var trStr =
                            '<td class="hidden-phone"><a href="#">'+(i+1)+'</a></td>'+
                            '<td>'+todo.title+'</td>'+
                            '<td>日期:'+todo.orderDate+'-'+todo.startTime+'-'+todo.endTime+'</td>'+
                            '<td>'+succStr+'</td>'+
                            '<td>'+todo.notice+'</td>'+
                            '<td>'+oprateStr+'</td>';
                        $('<tr>'+trStr+'</tr>').appendTo($('#id_order_list'));
                        //$('#id_order_list').appendChild(tr);
                    }
                }
            });
            $('#id_update_pwd').click(function () {
                //alert($('input[name="pwd"]').val());

                $.ajax(
                    {
                        url:'/user/updatePwd',
                        type:'POST',
                        data:{
                            pwd:$('input[name="pwd"]').val(),
                            newPwd:$('input[name="new_pwd"]').val(),
                            newPwdTwo:$('input[name="new_pwd_two"]').val()
                        },
                        datatype:'json',
                        success:function(data){
                            responseMsg(data);
                        }
                    }
                );
            });
            $('#id_update_info').click(function () {
                $.ajax(
                    {
                        url:'/user/updateInfo',
                        type:'POST',
                        data:{
                            userid:$('input[name="info_userid"]').val(),
                            name:$('input[name="info_name"]').val(),
                            username:$('input[name="info_username"]').val(),
                            iphone:$('input[name="info_iphone"]').val(),
                            notice:$('input[name="info_notice"]').val(),
                            email:$('input[name="info_email"]').val()
                        },
                        datatype:'json',
                        success:function(data){
                            responseMsg(data);
                        }
                    }
                );
            });

            $('#id_check_email_send').click(function () {
                $.ajax({
                    url:'/getVerificationCode?username='+$('input[name="check_email"]').val(),
                    type:'get',
                    data:{},
                    datatype:'json',
                    success:function(data){
                        var code = responseMsg(data);
                        if (code){
                            //test
                            $('input[name="check_email"]').setVal(code);
                        }
                    },
                    error:function(err){
                        //responseMsg(err);
                        setErrMsg("验证码已经发送失败！请重试！");
                    }
                });
            });

            $('#id_check_email').click(function () {
                $.ajax({
                    url:'/userCheckEmail',
                    type:'post',
                    data:{
                        userId:$('input[name="info_userId"]').val(),
                        email:$('input[name="check_email"]').val(),
                        emailCode:$('input[name="check_email_code"]').val()
                    },
                    datatype:'json',
                    success:function(data){
                        responseMsg(data);
                    },
                    error:function(err){
                        responseMsg(err);
                    }
                });
            });

            $('#id_check_iphone_send').click(function () {
                $.ajax({
                    url:'/getVerificationCode?username='+$('input[name="check_iphone"]').val(),
                    type:'get',
                    data:{},
                    datatype:'json',
                    success:function(data){
                        var code = responseMsg(data);
                        if (code){
                            //test
                            $('input[name="check_iphone"]').setVal(code);
                        }
                    },
                    error:function(err){
                        //responseMsg(err);
                        setErrMsg("验证码已经发送失败！请重试！");
                    }
                });
            });

            $('#id_check_iphone').click(function () {
                $.ajax({
                    url:'/userCheckIphone',
                    type:'post',
                    data:{
                        userId:$('input[name="info_userId"]'),
                        iphone:$('input[name="check_iphone"]'),
                        iphoneCode:$('input[name="check_iphone_code"]')
                    },
                    datatype:'json',
                    success:function(data){
                        responseMsg(data);
                    },
                    error:function(err){
                        responseMsg(err);
                    }
                });
            });
        }
    }
}();