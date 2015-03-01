<?php
namespace frontend\models;

use common\models\User;
use yii\base\Model;
use Yii;

/**
 * 注册驾校实体类
 * SignupPosition form
 */
class SignupPositionForm extends Model
{
    /** 驾校id */
    public $s_id = 0;
    
    /** 类型，当前只能为驾校 */
    public $type = 1;
    
    /** 编号 系统生成 */
    public $number = '1110011001';
    
    /** 营业点名称 */
    public $name;
    
    /** 电话联系人 */
    public $phone_name;
    
    /** 座机 */
    public $cell;
    
    /** 手机 */
    public $phone;
    
    /** 详细地址 */
    public $address;
    
    /** 地址经纬度 */
    public $position;
    
    /** 营业点所属于城市 */
    public $city;
    
    /** 管理员用户名 */
    public $username;
    
    /** 管理员密码 */
    public $password;
    
    /** 主页 */
    public $home_image;
    public $qq;
    
    /** 邮箱 */
    public $email;
    public $car_instruction;
    public $car_remark;
    
    /** 留言 */
    public $message;
    /** 学员报名信息 */
    public $user_sign;

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
        ];
    }

    /**
     * Signs 注册营业点
     *
     * @return User|null the saved model or null if saving fails
     */
    public function signup()
    {
        if ($this->validate()) {
            if ($this->password == $this->passwordTwo)
            {
                $user = new User();
                $user->username = $this->username;
                $user->email = $this->email;
                $user->setPassword($this->password);
                $user->generateAuthKey();
                if ($user->save()) {
                    return $user;
                }
            }
        }

        return null;
    }
    
}
