<?php
/* @var $this yii\web\View */
$this->title = '用户中心';
?>

  <!-- content start -->
  <div class="admin-content">

    <div class="am-cf am-padding">
      <div class="am-fl am-cf"><strong class="am-text-primary am-text-lg">登记练车时间</strong> </div>
    </div>
    <div id="main" style="width:1060px">
       <div id='calendar'></div>
    </div>
  </div>
  <!-- content end -->
  
 <head>
    <link rel="stylesheet" type="text/css" href="css/fullcalendar.css">
    <link rel="stylesheet" type="text/css" href="css/fancybox.css">
    <style type="text/css">
        #calendar{width:960px; margin:20px auto 10px auto}
        .fancy{width:450px; height:auto}
        .fancy h3{height:30px; line-height:30px; border-bottom:1px solid #d3d3d3; font-size:14px}
        .fancy form{padding:10px}
        .fancy p{height:28px; line-height:28px; padding:4px; color:#999}
        .input{height:20px; line-height:20px; padding:2px; border:1px solid #d3d3d3; width:100px}
        .btn{-webkit-border-radius: 3px;-moz-border-radius:3px;padding:5px 12px; cursor:pointer}
        .btn_ok{background: #360;border: 1px solid #390;color:#fff}
        .btn_cancel{background:#f0f0f0;border: 1px solid #d3d3d3; color:#666 }
        .btn_del{background:#f90;border: 1px solid #f80; color:#fff }
        .sub_btn{height:32px; line-height:32px; padding-top:6px; border-top:1px solid #f0f0f0; text-align:right; position:relative}
        .sub_btn .del{position:absolute; left:2px}
    </style>
    <script src='assets/js/fancy/jquery-1.9.1.js'></script>
    <script src='assets/js/jquery-ui.js'></script>
    <script src='assets/js/fancy/fullcalendar.min.js'></script>
    <script src='assets/js/fancy/jquery.fancybox-1.3.1.pack.js'></script>
    <script type="text/javascript" src="assets/js/fancy/myFull.js"></script>
</head>



