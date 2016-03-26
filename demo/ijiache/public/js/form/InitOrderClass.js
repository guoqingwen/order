/**
 * Created by wenguoqing on 2016/3/26.
 */
var InitOrderClass = function(){
    return {
        init: function (){

            //alert(new Date().format("yyyy-MM-dd"));
            $("#id_date").attr('value', new Date().format("yyyy-MM-dd"));
            $("#id_date_next").attr('value', new Date().format("yyyy-MM-dd"));

            $("#id_city,#id_prov,#id_dist").change(function(){
                updateStores($("#id_prov").val(),$("#id_city").val(),$("#id_dist").val(),"");
            });

            $("#id_jiaxiao").change(function(){
                updateStores($("#id_prov").val(),$("#id_city").val(),$("#id_dist").val(),$("#id_jiaxiao").val());
            });

            $('#id_query').click(function(){
                $.ajax({
                    url:
                    '/user/orderList?province='+
                    $("#id_prov").val()+
                    '&city='+$("#id_city").val()+
                    '&district='+$("#id_dist").val()+
                    '&storeId='+$("#id_store").val()+
                    '&orderDate='+$("#id_date").val(),
                    type:'get',
                    date:{},
                    dateType:'json',
                    success:function(data){
                        var len = data.orders.length;
                        //alert(len);
                        //alert(data.orderDate);
                        for (var i = 0 ; i < len; i++){
                            var order = data.orders[i];
                            var trStr =
                                '<td class="hidden-phone"><a href="#">'+(i+1)+'</a></td>'+
                                '<td>'+order.title+'</td>'+
                                '<td class="hidden-phone">'+data.orderDate+'</td>'+
                                '<td>'+order.startTime + '-' + order.endTime+'</td>'+
                                '<td>0</td>'+
                                '<td><a class="btn green mini" href="/store_order/'+order._id+'/add?orderDate='+data.orderDate+'">报名</a></td>';

                            $('<tr>'+trStr+'</tr>').appendTo($('#id_class_list'));
                        }
                        if (len > 0){
                            $("#id_date_next").html(data.orderDate);
                            $('#id_next_div').show();
                        }
                        else{
                            $('#id_next_div').hide();
                        }
                    }
                });
            });

            $.ajax({url:'/getJiaxiaos',
                    type:'get',
                    date:{},
                    dateType:'json',
                    success:function(data){
                        var len = data.length;
                        for (var i = 0 ; i < len; i++){
                            var obj = data[i];
                            $("#id_jiaxiao").append('<option value='+obj._id+'>'+obj.title+'</option>');
                        }
                    }
                }
            );

        }
    }
}();

function updateStores(province,city,district,jiaxiao){
    $.ajax({url:'/getJiaxiaoStores?province='+province+'&city='+city+'&district='+district+'&jiaxiaoId='+jiaxiao,
            type:'get',
            date:{},
            dateType:'json',
            success:function(data){
                var len = data.length;
                $("#id_store").children('option').remove();
                for (var i = 0 ; i < len; i++){
                    var obj = data[i];
                    $("#id_store").append('<option value='+obj._id+'>'+obj.title+'</option>');
                }
            }
        }
    );
}