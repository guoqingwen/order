<?php

namespace common\models;

use Yii;
use yii\base\NotSupportedException;
use yii\behaviors\TimestampBehavior;
use yii\db\ActiveRecord;
use yii\web\IdentityInterface;

/**
 * This is the model class for table "t_users".
 *
 * @property integer $id
 * @property integer $usertype
 * @property string $username
 * @property string $auth_key
 * @property string $password_hash
 * @property string $password_reset_token
 * @property integer $role
 * @property integer $status
 * @property integer $created_at
 * @property integer $updated_at
 * @property string $six
 * @property string $password
 * @property string $email
 * @property string $cell
 * @property string $address
 * @property string $name
 * @property string $cardid
 * @property string $question
 * @property string $answer
 * @property integer $is_check_cell
 * @property integer $is_check_email
 * @property string $register_time
 * @property string $login_time
 * @property integer $login_count
 * @property integer $pos_id
 * @property integer $drive_type
 * @property string $drive_number
 * @property string $drive_pass_time
 * @property string $qq
 * @property integer $teach_year
 * @property integer $is_coach
 * @property integer $is_admin
 * @property integer $status_id
 */
class User extends ActiveRecord implements IdentityInterface
{
    const STATUS_DELETED = 0;
    const STATUS_ACTIVE = 10;
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
         return '{{%t_users}}';
    }
    
    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        return [
            TimestampBehavior::className(),
        ];
    }
    
    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
           // [['usertype', 'role', 'status', 'created_at', 'updated_at', 'is_check_cell', 'is_check_email', 'login_count', 'pos_id', 'drive_type', 'teach_year', 'is_coach', 'is_admin', 'status_id'], 'integer'],
           // [['username', 'auth_key', 'password_hash', 'created_at', 'updated_at'], 'required'],
           // [['register_time', 'login_time', 'drive_pass_time'], 'safe'],
           // [['username', 'password', 'email', 'name', 'question', 'answer', 'drive_number', 'qq'], 'string', 'max' => 20],
           // [['auth_key'], 'string', 'max' => 32],
           // [['password_hash', 'password_reset_token'], 'string', 'max' => 255],
           // [['six'], 'string', 'max' => 5],
            //[['cell'], 'string', 'max' => 11],
            //[['address'], 'string', 'max' => 150],
            //[['cardid'], 'string', 'max' => 18]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'usertype' => '用户类型',
            'username' => '用户名',
            'auth_key' => 'Auth Key',
            'password_hash' => 'Password Hash',
            'password_reset_token' => 'Password Reset Token',
            'role' => 'Role',
            'status' => 'Status',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
            'six' => '性别',
            'password' => 'Password',
            'email' => 'Email',
            'cell' => '座机号码',
            'address' => '详细地址',
            'name' => '真实名字',
            'cardid' => '身份证号码',
            'question' => '密码问题',
            'answer' => '密码问题答案',
            'is_check_cell' => 'Is Check Cell',
            'is_check_email' => 'Is Check Email',
            'register_time' => 'Register Time',
            'login_time' => 'Login Time',
            'login_count' => 'Login Count',
            'pos_id' => '报名的驾校id',
            'drive_type' => 'Drive Type',
            'drive_number' => 'Drive Number',
            'drive_pass_time' => 'Drive Pass Time',
            'qq' => 'Qq',
            'teach_year' => '驾龄',
            'is_coach' => '是否是教练',
            'is_admin' => '是否是管理员',
            'status_id' => '学员状态',
        ];
    }
    
    /**
     * @inheritdoc
     */
    public static function findIdentity($id)
    {
        return static::findOne(['id' => $id, 'status' => self::STATUS_ACTIVE]);
    }
    
    /**
     * @inheritdoc
     */
    public static function findIdentityByAccessToken($token, $type = null)
    {
        throw new NotSupportedException('"findIdentityByAccessToken" is not implemented.');
    }
    
    /**
     * Finds user by username
     *
     * @param string $username
     * @return static|null
     */
    public static function findByUsername($username)
    {
        return static::findOne(['username' => $username, 'status' => self::STATUS_ACTIVE]);
    }
    
    /**
     * Finds user by email
     *
     * @param string $email
     * @return static|null
     */
    public static function findByEmail($email)
    {
        return static::findOne(['email' => $email, 'status' => self::STATUS_ACTIVE]);
    }
    
    /**
     * Finds user by password reset token
     *
     * @param string $token password reset token
     * @return static|null
     */
    public static function findByPasswordResetToken($token)
    {
        if (!static::isPasswordResetTokenValid($token)) {
            return null;
        }
    
        return static::findOne([
            'password_reset_token' => $token,
            'status' => self::STATUS_ACTIVE,
        ]);
    }
    
    /**
     * Finds out if password reset token is valid
     *
     * @param string $token password reset token
     * @return boolean
     */
    public static function isPasswordResetTokenValid($token)
    {
        if (empty($token)) {
            return false;
        }
        $expire = Yii::$app->params['user.passwordResetTokenExpire'];
        $parts = explode('_', $token);
        $timestamp = (int) end($parts);
        return $timestamp + $expire >= time();
    }
    
    /**
     * @inheritdoc
     */
    public function getId()
    {
        return $this->getPrimaryKey();
    }
    
    /**
     * @inheritdoc
     */
    public function getAuthKey()
    {
        return $this->auth_key;
    }
    
    /**
     * @inheritdoc
     */
    public function validateAuthKey($authKey)
    {
        return $this->getAuthKey() === $authKey;
    }
    
    /**
     * Validates password
     *
     * @param string $password password to validate
     * @return boolean if password provided is valid for current user
     */
    public function validatePassword($password)
    {
        return Yii::$app->security->validatePassword($password, $this->password_hash);
    }
    
    /**
     * Generates password hash from password and sets it to the model
     *
     * @param string $password
     */
    public function setPassword($password)
    {
        $this->password_hash = Yii::$app->security->generatePasswordHash($password);
    }
    
    /**
     * Generates "remember me" authentication key
     */
    public function generateAuthKey()
    {
        $this->auth_key = Yii::$app->security->generateRandomString();
    }
    
    /**
     * Generates new password reset token
     */
    public function generatePasswordResetToken()
    {
        $this->password_reset_token = Yii::$app->security->generateRandomString() . '_' . time();
    }
    
    /**
     * Removes password reset token
     */
    public function removePasswordResetToken()
    {
        $this->password_reset_token = null;
    }
}
