<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "t_record_time".
 *
 * @property integer $id
 * @property string $record_date
 * @property string $record_time
 * @property integer $pos_id
 */
class TRecordTime extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 't_record_time';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['id'], 'required'],
            [['id', 'pos_id'], 'integer'],
            [['record_date'], 'safe'],
            [['record_time'], 'string']
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'record_date' => 'Record Date',
            'record_time' => 'Record Time',
            'pos_id' => 'Pos ID',
        ];
    }
}
