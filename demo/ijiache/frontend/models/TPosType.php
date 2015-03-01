<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "t_position_type".
 *
 * @property integer $id
 * @property string $name
 * @property string $instruction
 */
class TPosType extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 't_position_type';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['id'], 'required'],
            [['id'], 'integer'],
            [['instruction'], 'string'],
            [['name'], 'string', 'max' => 50]
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
            'instruction' => 'Instruction',
        ];
    }
}
