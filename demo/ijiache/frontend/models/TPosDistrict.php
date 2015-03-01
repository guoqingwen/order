<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "t_pos_district".
 *
 * @property integer $id
 * @property string $name
 * @property integer $c_id
 * @property string $comment
 */
class TPosDistrict extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 't_pos_district';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['id'], 'required'],
            [['id', 'c_id'], 'integer'],
            [['name'], 'string', 'max' => 45],
            [['comment'], 'string', 'max' => 10]
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
            'c_id' => 'C ID',
            'comment' => 'Comment',
        ];
    }
}
