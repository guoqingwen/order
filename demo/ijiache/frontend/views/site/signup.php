<?php
use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $form yii\bootstrap\ActiveForm */
/* @var $model \frontend\models\SignupForm */

$this->title = '用户注册';
$this->params['breadcrumbs'][] = $this->title;
?>
   <div class="am-u-lg-6 am-u-md-8 am-u-sm-centered">
					
		<form method="post" class="am-form">
		  <label for="email">用户名:</label>
		  <input type="email" name="" id="email" value="">
		  <br>
		  <label for="email">邮箱:</label>
		  <input type="email" name="" id="email" value="">
		  <br>
		  <label for="password">密码:</label>
		  <input type="password" name="" id="password" value="">
		  <br>
		  <label for="password">重复密码:</label>
		  <input type="password" name="" id="password" value="">
		  <br>
		 
		  <div class="am-cf">
			<input type="submit" name="" value="注 册" class="am-btn am-btn-primary am-btn-sm am-fl">
		  </div>
		</form>
		<hr>	
  </div>
	
