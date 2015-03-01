<?php
namespace frontend\controllers;

use Yii;
use common\models\LoginForm;
use frontend\models\PasswordResetRequestForm;
use frontend\models\ResetPasswordForm;
use frontend\models\SignupForm;
use frontend\models\ContactForm;
use yii\base\InvalidParamException;
use yii\web\BadRequestHttpException;
use yii\web\Controller;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;
use frontend\models\SignupPositionForm;

/**
 * Site controller
 */
class SiteController extends Controller
{
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

    public function actionIndex()
    {
        return $this->render('index');
    }

    public function actionLogin()
    {
        if (!\Yii::$app->user->isGuest) {
            return $this->goHome();
        }

        $model = new LoginForm();
        $msg = '';
        if ($model->load(Yii::$app->request->post()) ) {
            if ($model->login())
            {
               return $this->goBack();
            }
            else
            {
                $msg = '用户名或密码错误';
            }
        } 
        return $this->render('login', [
            'model' => $model, 'msg' => $msg
        ]);
    }

    public function actionLogout()
    {
        Yii::$app->user->logout();

        return $this->goHome();
    }

    public function actionContact()
    {
        $model = new ContactForm();
        if ($model->load(Yii::$app->request->post()) && $model->validate()) {
            if ($model->sendEmail(Yii::$app->params['adminEmail'])) {
                Yii::$app->session->setFlash('success', 'Thank you for contacting us. We will respond to you as soon as possible.');
            } else {
                Yii::$app->session->setFlash('error', 'There was an error sending email.');
            }

            return $this->refresh();
        } else {
            return $this->render('contact', [
                'model' => $model,
            ]);
        }
    }

    public function actionAbout()
    {
        return $this->render('about');
    }

    public function actionSignup()
    {
        return $this->render('signuplist');
    }
    
    /** 注册普通用户 */
    public function actionUser()
    {
        $user = '';
        $model = new SignupForm();
        if ($model->load(Yii::$app->request->post())) {
            $user = $model->signup();
            $verType = gettype($user);
            if ($verType === 'object') {
                if (Yii::$app->getUser()->login($user)) {
                    return $this->goHome();
                }
                return $this->render('error', ['name' => '用户注册','message' => '注册成功，登陆出错！！']);
            }
        }
    
        return $this->render('signupUser', [
            'model' => $model, 'msg' => $user
        ]);
    }
    
    /** 注册营业点 */
    public function actionPosition()
    {
        $user = '';
        $model = new SignupPositionForm();
        if ($model->load(Yii::$app->request->post())) {
            $user = $model->signup();
            $verType = gettype($user);
            if ($verType === 'object') {
                if (Yii::$app->getUser()->login($user)) {
                    return $this->goHome();
                }
            }
        }
    
        return $this->render('signupPosition', [
            'model' => $model, 'msg' => $user
        ]);
    }
    
    /** 注册教练 */
    public function actionCoach()
    {
        $model = new SignupForm();
        $user = '';
        if ($model->load(Yii::$app->request->post())) {
            $user = $model->signupCoach();
            $verType = gettype($user);
            if ($verType === 'object') {
                if (Yii::$app->getUser()->login($user)) {
                    return $this->goHome();
                }
            }
        }
    
        return $this->render('signupCoach', [
            'model' => $model, 'msg' => $user
        ]);
    }
    
    /** 添加驾校 */
    public function actionAddpos()
    {
        $user = '';
        $model = new SignupPositionForm();
        if ($model->load(Yii::$app->request->post())) {
            $user = $model->signup();
            $verType = gettype($user);
            if ($verType === 'object') {
                if (Yii::$app->getUser()->login($user)) {
                    return $this->goHome();
                }
            }
        }
    
        return $this->render('addPosition', [
            'model' => $model, 'msg' => $user
        ]);
    }

    public function actionRequestPasswordReset()
    {
        $model = new PasswordResetRequestForm();
        if ($model->load(Yii::$app->request->post()) && $model->validate()) {
            if ($model->sendEmail()) {
                Yii::$app->getSession()->setFlash('success', 'Check your email for further instructions.');

                return $this->goHome();
            } else {
                Yii::$app->getSession()->setFlash('error', 'Sorry, we are unable to reset password for email provided.');
            }
        }

        return $this->render('requestPasswordResetToken', [
            'model' => $model,
        ]);
    }

    public function actionResetPassword($token)
    {
        try {
            $model = new ResetPasswordForm($token);
        } catch (InvalidParamException $e) {
            throw new BadRequestHttpException($e->getMessage());
        }

        if ($model->load(Yii::$app->request->post()) && $model->validate() && $model->resetPassword()) {
            Yii::$app->getSession()->setFlash('success', '密码重置成功.');

            return $this->goHome();
        }

        return $this->render('resetPassword', [
            'model' => $model,
        ]);
    }
}
