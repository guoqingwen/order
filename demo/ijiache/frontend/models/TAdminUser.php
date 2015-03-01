<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "t_admin_users".
 *
 * @property integer $u_id
 * @property integer $pos_id
 * @property integer $s_id
 */
class TAdminUser extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 't_admin_users';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['u_id'], 'required'],
            [['u_id', 'pos_id', 's_id'], 'integer']
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'u_id' => 'U ID',
            'pos_id' => 'Pos ID',
            's_id' => 'S ID',
        ];
    }
}
