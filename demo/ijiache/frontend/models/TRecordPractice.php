<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "t_record_practice".
 *
 * @property integer $id
 * @property integer $u_id
 * @property string $date
 * @property string $time
 * @property integer $is_practice
 */
class TRecordPractice extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 't_record_practice';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['id'], 'required'],
            [['id', 'u_id', 'is_practice'], 'integer'],
            [['date', 'time'], 'safe']
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'u_id' => 'U ID',
            'date' => 'Date',
            'time' => 'Time',
            'is_practice' => 'Is Practice',
        ];
    }
}
