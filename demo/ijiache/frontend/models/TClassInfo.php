<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "t_class_info".
 *
 * @property integer $id
 * @property string $name
 * @property integer $pos_id
 * @property integer $pre_price
 * @property integer $price
 * @property integer $user_price
 * @property string $instruction
 * @property string $complete_time
 */
class TClassInfo extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 't_class_info';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['id'], 'required'],
            [['id', 'pos_id', 'pre_price', 'price', 'user_price'], 'integer'],
            [['instruction', 'complete_time'], 'string'],
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
            'pos_id' => 'Pos ID',
            'pre_price' => 'Pre Price',
            'price' => 'Price',
            'user_price' => 'User Price',
            'instruction' => 'Instruction',
            'complete_time' => 'Complete Time',
        ];
    }
}
