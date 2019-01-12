<?php
// +----------------------------------------------------------------------
// | 测试演示用CMUserList
// +----------------------------------------------------------------------
// | Author: seaboyer <seaboyer@163.com>
// | Date: 2018-09-06
// +----------------------------------------------------------------------

namespace app\api\model;

use app\api\model\CommonModel;
use think\Db;

class UserInfo extends BaseModel
{
    protected $table = 'b_1_user_info';
    protected function initialize()
    {
        parent::initialize();
    }

    public function getUnionid ($uid)
    {
        $where['uid'] = $uid;
        return $this->where($where)->field('unionid')->find();
    }
}