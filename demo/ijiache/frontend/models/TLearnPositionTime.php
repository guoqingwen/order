<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "t_learn_pos_time".
 *
 * @property integer $id
 * @property integer $pos_id
 * @property integer $hours
 * @property string $hour_info
 * @property integer $days
 * @property string $day_info
 */
class TLearnPositionTime extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 't_learn_pos_time';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['id'], 'required'],
            [['id', 'pos_id', 'hours', 'days'], 'integer'],
            [['hour_info', 'day_info'], 'string']
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
            'hours' => 'Hours',
            'hour_info' => 'Hour Info',
            'days' => 'Days',
            'day_info' => 'Day Info',
        ];
    }
}
