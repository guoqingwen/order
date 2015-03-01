<?php

/* @var $this yii\web\View */
/* @var $form yii\bootstrap\ActiveForm */
/* @var $model \frontend\models\SignupForm */

$this->title = '教练注册';
$this->params['breadcrumbs'][] = ['label' => '注册类型', 'url' => '?r=site/signup'];
$this->params['breadcrumbs'][] = $this->title;
?>
   <div class="am-u-lg-6 am-u-md-8 am-u-sm-centered">
		<form method="post" class="am-form" action="?r=site/coach">
		<input type="hidden" name="_csrf" value='<?php Yii::$app->getRequest()->csrfParam; ?>'/>
		  <label for="id_username">用户名:</label>
		  <input type="text" name="SignupForm[username]" id="id_username" value="wenguoqing">
		  <br>
		  <label for="id_email">邮箱:</label>
		  <input type="email" name="SignupForm[email]" id="id_email" value="wenguoqing1991@126.com">
		  <br>
		  <label for="id_password">密码:</label>
		  <input type="password" name="SignupForm[password]" id="id_password" value="123456">
		  <br>
		  <label for="id_password_two">重复密码:</label>
		  <input type="password" name="SignupForm[passwordTwo]" id="id_password_two" value="123456">
		  <br>
		 
		  <div class="am-cf">
			<button type="submit" name="signup-form" class="am-btn am-btn-primary am-btn-sm am-fl">注 册</button>
			<br><p style="color: red"><?php echo $msg ?></p>
		  </div>
		</form>
		<hr>	
  </div>
	
