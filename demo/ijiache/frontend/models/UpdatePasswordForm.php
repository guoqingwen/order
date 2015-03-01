<?php
namespace frontend\models;

use yii\base\Model;
use Yii;

/**
 * UpdatePassword form
 */
class UpdatePasswordForm extends Model
{
    public $oldpwd;
    public $password;
    public $passwordTwo;

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            ['oldpwd', 'required'],
            ['oldpwd', 'string', 'min' => 6],
            
            ['password', 'required'],
            ['password', 'string', 'min' => 6],
            
            ['passwordTwo', 'required'],
            ['passwordTwo', 'string', 'min' => 6],
        ];
    }

    /**
     * 修改用户密码
     *
     * @return  修改成功： 返回null, 修改失败：返回相应的错误。
     */
    public function update()
    {
        if ($this->validate())
        {
            if ($this->password === $this->oldpwd)
            {
                return '修改的新密码与旧密码相同，请输入其他密码！';
            }
            if ($this->password === $this->passwordTwo)
            {
                $user = Yii::$app->user->identity;
                if ($user->validatePassword($this->oldpwd))
                {
                    $user->setPassword($this->password);
                    $user->generateAuthKey();
                    if ($user->update() !== false) {
                        return null;
                    }
                    else {
                        return '密码修改失败！';
                    }
                }
                else
                {
                    return '数据校验出错，password_hash比较出错';
                }
            }
            else
            {
                return '输入密码不一致';
            }
        }

        return '数据校验出错，输入数据有误';
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
}
