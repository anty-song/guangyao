<?php
// +----------------------------------------------------------------------
// | 锁商品WLockOrder
// +----------------------------------------------------------------------
// | Author: seaboyer <seaboyer@163.com>
// | Date: 2018-09-28
// +----------------------------------------------------------------------

namespace app\api\model;

use app\api\model\BaseModel;

class WLockOrder extends BaseModel
{

    protected function initialize()
    {
        parent::initialize();
    }

    /**
     * @cc 测试演示方法
     *
     * @author seaboyer@163.com
     * @date 2018-09-29
     * @version 1.0
     */
    public function getList($where = [])
    {
        if (empty($where)) {
            $res = $this->find();
        } else {
            $res = $this->where($where)->select();
        }
    	return $res;
    }


}