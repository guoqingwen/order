<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "t_learn_pos".
 *
 * @property integer $s_id
 * @property integer $type
 * @property integer $id
 * @property string $number
 * @property string $name
 * @property string $phone_name
 * @property string $cell
 * @property string $phone
 * @property string $address
 * @property string $position
 * @property string $practice_address
 * @property string $practice_position
 * @property string $city
 * @property string $username
 * @property string $password
 * @property string $home_image
 * @property string $qq
 * @property string $email
 * @property string $car_instruction
 * @property string $car_remark
 * @property string $message
 * @property string $user_sign
 */
class TLearnPosition extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 't_learn_pos';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['s_id'], 'required'],
            [['s_id', 'type', 'id'], 'integer'],
            [['car_instruction', 'car_remark', 'message', 'user_sign'], 'string'],
            [['number', 'position', 'practice_position'], 'string', 'max' => 10],
            [['name', 'phone_name', 'username', 'password', 'qq', 'email'], 'string', 'max' => 20],
            [['cell'], 'string', 'max' => 12],
            [['phone'], 'string', 'max' => 11],
            [['address', 'practice_address'], 'string', 'max' => 200],
            [['city', 'home_image'], 'string', 'max' => 50]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            's_id' => 'S ID',
            'type' => 'Type',
            'id' => 'ID',
            'number' => 'Number',
            'name' => 'Name',
            'phone_name' => 'Phone Name',
            'cell' => 'Cell',
            'phone' => 'Phone',
            'address' => 'Address',
            'position' => 'Position',
            'practice_address' => 'Practice Address',
            'practice_position' => 'Practice Position',
            'city' => 'City',
            'username' => 'Username',
            'password' => 'Password',
            'home_image' => 'Home Image',
            'qq' => 'Qq',
            'email' => 'Email',
            'car_instruction' => 'Car Instruction',
            'car_remark' => 'Car Remark',
            'message' => 'Message',
            'user_sign' => 'User Sign',
        ];
    }
}
