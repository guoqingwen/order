<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "t_pos_city".
 *
 * @property integer $id
 * @property string $name
 * @property integer $p_id
 * @property integer $c_id
 */
class TPosCity extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 't_pos_city';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['id'], 'required'],
            [['id', 'p_id', 'c_id'], 'integer'],
            [['name'], 'string', 'max' => 33]
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
            'p_id' => 'P ID',
            'c_id' => 'C ID',
        ];
    }
}
