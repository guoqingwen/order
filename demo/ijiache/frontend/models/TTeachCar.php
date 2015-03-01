<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "t_teach_car".
 *
 * @property integer $id
 * @property integer $pos_id
 * @property string $name
 * @property string $plate_number
 * @property integer $status
 * @property string $time
 * @property integer $year
 */
class TTeachCar extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 't_teach_car';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['id'], 'required'],
            [['id', 'pos_id', 'status', 'year'], 'integer'],
            [['time'], 'safe'],
            [['name'], 'string', 'max' => 20],
            [['plate_number'], 'string', 'max' => 10]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'pos_id' => 'Pos ID',
            'name' => 'Name',
            'plate_number' => 'Plate Number',
            'status' => 'Status',
            'time' => 'Time',
            'year' => 'Year',
        ];
    }
}
