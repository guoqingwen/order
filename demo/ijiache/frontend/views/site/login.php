<?php

/* @var $this yii\web\View */
/* @var $form yii\bootstrap\ActiveForm */
/* @var $model \common\models\LoginForm */


$this->title = '用户登录';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="site-login">
    <div class="am-u-lg-6 am-u-md-8 am-u-sm-centered">
    <hr>
    <form id="login-form" method="post" action="/ijiache/frontend/web/index.php?r=site/login" class="am-form" role="form">
      <input type="hidden" name="_csrf" value='<?php Yii::$app->getRequest()->csrfParam; ?>'/>
      <label for="email">用户名:</label>
      <input type="text" name="LoginForm[username]" id="email" value="wenguoqing">
      <br>
      <label for="password">密码:</label>
      <input type="password" name="LoginForm[password]" id="password" value="123456">
      <br>
      <label for="remember-me">
        <input id="remember-me" name="LoginForm[rememberMe]" type="checkbox" value="1" >
        记住密码
      </label>
      <br>
      <div class="am-cf">
        <button type="submit" class="am-btn am-btn-primary am-btn-sm am-fl" name="login-button">登录</button>
        <button type="submit" class="am-btn am-btn-default am-btn-sm am-fr"><a href="?r=site/request-password-reset">忘记密码 ^_^? </a></button>
        <br><p style="color: red"><?php  echo $msg ?></p>
      </div>
    </form>
    <hr>
  </div>
</div>