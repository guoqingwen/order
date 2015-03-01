<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "t_pos_province".
 *
 * @property integer $id
 * @property string $name
 * @property integer $code
 * @property string $type
 */
class TPosProvince extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 't_pos_province';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['id'], 'required'],
            [['id', 'code'], 'integer'],
            [['name'], 'string', 'max' => 25],
            [['type'], 'string', 'max' => 15]
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
            'code' => 'Code',
            'type' => 'Type',
        ];
    }
}
