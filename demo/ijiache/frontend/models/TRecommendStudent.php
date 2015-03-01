<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "t_recommend_student".
 *
 * @property integer $id
 * @property integer $pos_id
 * @property integer $class_id
 * @property integer $u_id
 * @property string $time
 * @property string $s_name
 * @property string $s_cell
 * @property string $s_address
 * @property integer $is_enter
 */
class TRecommendStudent extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 't_recommend_student';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['id'], 'required'],
            [['id', 'pos_id', 'class_id', 'u_id', 'is_enter'], 'integer'],
            [['time'], 'safe'],
            [['s_name'], 'string', 'max' => 20],
            [['s_cell'], 'string', 'max' => 11],
            [['s_address'], 'string', 'max' => 200]
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
            'class_id' => 'Class ID',
            'u_id' => 'U ID',
            'time' => 'Time',
            's_name' => 'S Name',
            's_cell' => 'S Cell',
            's_address' => 'S Address',
            'is_enter' => 'Is Enter',
        ];
    }
}
