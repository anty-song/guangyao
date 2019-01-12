<?php

namespace app\work\model;

use app\work\model\BaseModel;

class WorkProduct extends BaseModel
{
	//$table = 'b_1_user_list';
	//protected $tableName = 'w_invite_m000_u0';//1_user_list

    public function getData($where=array())
    {
    	return $this->where($where)->select();
    }

}