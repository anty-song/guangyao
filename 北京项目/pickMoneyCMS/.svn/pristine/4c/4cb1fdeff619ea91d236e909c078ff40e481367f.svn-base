<?php
// +----------------------------------------------------------------------
// | 百万红包活动Activity
// +----------------------------------------------------------------------
// | Author: seaboyer <seaboyer@163.com>
// | Date: 2018-09-06
// +----------------------------------------------------------------------

namespace app\api\model;

use app\api\model\CommonModel;
use think\Db;

class UserTime extends BaseModel
{
    protected $table = 'b_1_user_time';
    protected function initialize()
    {
        parent::initialize();
    }

    public function is_clicked ($uid) {
        $where[] = ['uid', '=', $uid];
        $field = 'id, time1';
        return Db::table($this->table)->where($where)->field($field)->find();
    }
}