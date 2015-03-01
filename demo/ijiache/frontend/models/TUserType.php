<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "t_user_types".
 *
 * @property integer $typeid
 * @property string $typename
 * @property string $type_instruction
 */
class TUserType extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 't_user_types';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['typeid'], 'required'],
            [['typeid'], 'integer'],
            [['type_instruction'], 'string'],
            [['typename'], 'string', 'max' => 20]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'typeid' => 'Typeid',
            'typename' => 'Typename',
            'type_instruction' => 'Type Instruction',
        ];
    }
}
