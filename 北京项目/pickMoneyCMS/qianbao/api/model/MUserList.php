<?php
// +----------------------------------------------------------------------
// | 测试演示用MUserList
// +----------------------------------------------------------------------
// | Author: seaboyer <seaboyer@163.com>
// | Date: 2018-09-06
// +----------------------------------------------------------------------

namespace app\api\model;

use app\api\model\BaseModel;

class MUserList extends BaseModel
{
	protected $table = 'b_1_user_list';

    protected function initialize()
    {
        parent::initialize();
    }

    /**
     * @cc 测试演示方法
     *
     * @author seaboyer@163.com
     * @date 2018-09-06
     * @version 1.0
     */
    public function getUserList($where = [])
    {
    	return $this->where($where)->select();
    }




}