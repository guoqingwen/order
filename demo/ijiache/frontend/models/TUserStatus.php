<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "t_user_status".
 *
 * @property integer $id
 * @property string $name
 * @property integer $is_order
 */
class TUserStatus extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 't_user_status';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['id'], 'required'],
            [['id', 'is_order'], 'integer'],
            [['name'], 'string', 'max' => 20]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Name',
            'is_order' => 'Is Order',
        ];
    }
}
