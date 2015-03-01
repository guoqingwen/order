<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "t_driving_school".
 *
 * @property integer $ID
 * @property string $name
 * @property string $cell
 * @property string $phone
 * @property string $address
 * @property string $city
 * @property string $username
 * @property string $password
 * @property string $http_home
 * @property string $http_theory
 * @property string $instruction
 * @property string $home_image
 * @property string $company
 * @property string $company_id
 * @property string $phone_name
 * @property string $qq
 * @property string $email
 * @property string $server
 * @property string $car_instruction
 * @property string $car_remark
 */
class TDrivingSchool extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 't_driving_school';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['ID'], 'required'],
            [['ID'], 'integer'],
            [['instruction', 'server', 'car_instruction', 'car_remark'], 'string'],
            [['name', 'username', 'password', 'phone_name', 'qq', 'email'], 'string', 'max' => 20],
            [['cell'], 'string', 'max' => 12],
            [['phone'], 'string', 'max' => 11],
            [['address'], 'string', 'max' => 200],
            [['city', 'http_home', 'http_theory', 'home_image', 'company', 'company_id'], 'string', 'max' => 50]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'ID' => 'ID',
            'name' => 'Name',
            'cell' => 'Cell',
            'phone' => 'Phone',
            'address' => 'Address',
            'city' => 'City',
            'username' => 'Username',
            'password' => 'Password',
            'http_home' => 'Http Home',
            'http_theory' => 'Http Theory',
            'instruction' => 'Instruction',
            'home_image' => 'Home Image',
            'company' => 'Company',
            'company_id' => 'Company ID',
            'phone_name' => 'Phone Name',
            'qq' => 'Qq',
            'email' => 'Email',
            'server' => 'Server',
            'car_instruction' => 'Car Instruction',
            'car_remark' => 'Car Remark',
        ];
    }
}
