<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "t_teach_car_type".
 *
 * @property integer $id
 * @property string $code
 * @property string $name
 * @property integer $d_id
 */
class TTeachCarType extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 't_teach_car_type';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['id'], 'required'],
            [['id', 'd_id'], 'integer'],
            [['code'], 'string', 'max' => 10],
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
            'code' => 'Code',
            'name' => 'Name',
            'd_id' => 'D ID',
        ];
    }
}
