<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "t_teach_car_status".
 *
 * @property integer $id
 * @property integer $car_id
 * @property string $week_1
 * @property string $week_2
 * @property string $week_3
 * @property string $week_4
 * @property string $week_5
 * @property string $week_6
 * @property string $week_7
 */
class TTeachCarStatus extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 't_teach_car_status';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['id'], 'required'],
            [['id', 'car_id'], 'integer'],
            [['week_1', 'week_2', 'week_3', 'week_4', 'week_5', 'week_6', 'week_7'], 'string', 'max' => 30]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'car_id' => 'Car ID',
            'week_1' => 'Week 1',
            'week_2' => 'Week 2',
            'week_3' => 'Week 3',
            'week_4' => 'Week 4',
            'week_5' => 'Week 5',
            'week_6' => 'Week 6',
            'week_7' => 'Week 7',
        ];
    }
}
