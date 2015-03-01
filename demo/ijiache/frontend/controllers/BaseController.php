<?php
namespace frontend\controllers;

use Yii;
use yii\web\Controller;

/**
 * controller基类，用于用户登录验证
 * BaseController
 */
class BaseController extends Controller
{
   
    /** 重写render 判断是否登录 */
    public function render($view, $params = [])
    {
        if (!\Yii::$app->user->isGuest) {
            $content = $this->getView()->render($view, $params, $this);
            return $this->renderContent($content);
        }
        //如果没有登录，跳转到登录页面
        return Yii::$app->getResponse()->redirect('?r=site/login');
    }

    public function actionIndex()
    {
        return $this->render('index');
    }

    public function actionLogout()
    {
        Yii::$app->user->logout();

        return $this->goHome();
    }
    
    public function loadPost($model)
    {
        if ($model->load(Yii::$app->request->post())) {
            return true;
        } else {
            return false;
        }
    }

}
