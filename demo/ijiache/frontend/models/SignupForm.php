<?php
namespace frontend\models;

use common\models\User;
use yii\base\Model;
use Yii;

/**
 * Signup form
 */
class SignupForm extends Model
{
    public $username;
    public $email;
    public $password;
    public $passwordTwo;

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            ['username', 'filter', 'filter' => 'trim'],
            ['username', 'required'],
            ['username', 'unique', 'targetClass' => '\common\models\User', 'message' => 'This username has already been taken.'],
            ['username', 'string', 'min' => 2, 'max' => 255],

            ['email', 'filter', 'filter' => 'trim'],
            ['email', 'required'],
            ['email', 'email'],
            ['email', 'unique', 'targetClass' => '\common\models\User', 'message' => 'This email address has already been taken.'],

            ['password', 'required'],
            ['password', 'string', 'min' => 6],
            
            ['passwordTwo', 'required'],
            ['passwordTwo', 'string', 'min' => 6],
        ];
    }

    /**
     * 注册普通用户
     *
     * @return  User : 注册成功，null：数据校验出错，输入数据有误，0：username已经存在，1：email已经存在， 2：密码不相等
     */
    public function signup()
    {
        //if ($this->validate()) {
            if ($this->password === $this->passwordTwo)
            {
                if (User::findByUsername($this->username) !== null)
                {
                    return 'username已经存在';
                }
                if (User::findByEmail($this->email) !== null)
                {
                    return 'email已经存在';
                }
                $user = new User();
                $user->usertype = 3;//普通用户
                $user->username = $this->username;
                $user->email = $this->email;
                $user->setPassword($this->password);
                $user->generateAuthKey();
                if ($user->save()) {
                    return $user;
                }
            }
            else
            {
                return '输入密码不一致';
            }
        //}

        return '数据校验出错，输入数据有误';// . json_encode($this->getErrors());
    }
    
    /**
     * 注册教练
     *
     * @return User : 注册成功，null：数据校验出错，0：username已经存在，1：email已经存在， 2：密码不相等
     */
    public function signupCoach()
    {
        //if ($this->validate()) {
            if ($this->password === $this->passwordTwo)
            {
                if (User::findByUsername($this->username))
                {
                    return 'username已经存在';
                }
                if (User::findByEmail($this->email))
                {
                    return 'email已经存在';
                }
                $user = new User();
                $user->usertype = 5;//教练
                $user->username = $this->username;
                $user->email = $this->email;
                $user->setPassword($this->password);
                $user->generateAuthKey();
                if ($user->save()) {
                    return $user;
                }
            }
            else 
            {
                return '密码不相等';
            }
        //}
    
        return '数据校验出错';
    }
    
}
