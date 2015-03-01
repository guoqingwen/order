<?php
use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $form yii\bootstrap\ActiveForm */
/* @var $model \frontend\models\SignupForm */

$this->title = '选择注册类型';
$this->params['breadcrumbs'][] = $this->title;
?>
    <ul>
		<li><a href="?r=site/user">普通用户</a></li>
		<li><a href="?r=site/coach">教练</a></li>
		<li><a href="?r=site/position">驾校</a></li>
	  </ul>
