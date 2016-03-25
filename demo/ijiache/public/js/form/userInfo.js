/**
 * Created by wenguoqing on 2016/3/25.
 */

var UserInfo = function () {
    return {
        init:function(){

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
                            userid:$('input[name="userid"]').val(),
                            username:$('input[name="info_username"]').val(),
                            iphone:$('input[name="info_iphone"]').val(),
                            email:$('input[name="info_email"]').val()
                        },
                        datatype:'json',
                        success:function(data){
                            responseMsg(data);
                        }
                    }
                );
            });
        }
    }
}();