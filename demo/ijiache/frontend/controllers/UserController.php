<?php
namespace frontend\controllers;

use Yii;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;
use frontend\models\UpdatePasswordForm;

/**
 * 用户登录成功个人中心
 * User controller
 */
class UserController extends BaseController
{
    
    /**
     * @param string $id the ID of this controller.
     * @param Module $module the module that this controller belongs to.
     * @param array $config name-value pairs that will be used to initialize the object properties.
     */
    public function __construct($id, $module, $config = [])
    {
        $this->layout = 'mainUser';//驾校界面指定布局
        parent::__construct($id, $module, $config);
    }
    
    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::className(),
                'only' => ['logout', 'signup'],
                'rules' => [
                    [
                        'actions' => ['signup'],
                        'allow' => true,
                        'roles' => ['?'],
                    ],
                    [
                        'actions' => ['logout'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                ],
            ],
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'logout' => ['post'],
                ],
            ],
        ];
    }

    /**
     * @inheritdoc
     */
    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
            'captcha' => [
                'class' => 'yii\captcha\CaptchaAction',
                'fixedVerifyCode' => YII_ENV_TEST ? 'testme' : null,
            ],
        ];
    }
    
    
    /** 个人资料 */
    public function actionInfo()
    {
        return $this->render('userInfo');
    }
    
    /** 教练资料 */
    public function actionCoach()
    {
        return $this->render('coachInfo');
    }
    
    /** 绑定驾校 */
    public function actionAdd()
    {
        return $this->render('toAddPosition');
    }
    
    /** 修改密码 */
    public function actionPassword()
    {
        $model = new UpdatePasswordForm();
        $msg = '';
        if ($model->load(Yii::$app->request->post())) {
            $ret = $model->update();
            if ($ret){
                $msg = $ret;
            }
            else {
                $msg = '密码修改成功!';
            }
        } 
        return $this->render('updatePassword', [
            'model' => $model, 'msg' => $msg
        ]);
    }
    
    /** 预约日历 */
    public function actionIndent()
    {
        return $this->render('indent');
    }
    
    /** 驾校 */
    public function actionPosition()
    {
        return $this->render('position');
    }
    
    /** 练车日历 */
    public function actionPractice()
    {
        return $this->render('practice');
    }

    public function actionLogout()
    {
        Yii::$app->user->logout();

        return $this->goHome();
    }

}
