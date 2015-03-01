<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "t_drive_types".
 *
 * @property integer $type_id
 * @property string $code
 * @property string $drive_car_type
 * @property string $drive_car
 * @property string $drive_car_type_other
 * @property string $drive_age
 * @property integer $drive_year
 * @property string $drive_instruction
 * @property integer $drive_age_max
 * @property integer $drive_age_min
 */
class TDriveType extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 't_drive_types';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['type_id'], 'required'],
            [['type_id', 'drive_year', 'drive_age_max', 'drive_age_min'], 'integer'],
            [['drive_car', 'drive_instruction'], 'string'],
            [['code'], 'string', 'max' => 10],
            [['drive_car_type', 'drive_car_type_other', 'drive_age'], 'string', 'max' => 100]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'type_id' => 'Type ID',
            'code' => 'Code',
            'drive_car_type' => 'Drive Car Type',
            'drive_car' => 'Drive Car',
            'drive_car_type_other' => 'Drive Car Type Other',
            'drive_age' => 'Drive Age',
            'drive_year' => 'Drive Year',
            'drive_instruction' => 'Drive Instruction',
            'drive_age_max' => 'Drive Age Max',
            'drive_age_min' => 'Drive Age Min',
        ];
    }
}
