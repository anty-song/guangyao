<?php
// +----------------------------------------------------------------------
// | api调用成功表model
// +----------------------------------------------------------------------
// | Author: seaboyer <seaboyer@163.com>
// | Date: 2018-09-06
// +----------------------------------------------------------------------

namespace app\api\model;

use app\api\model\CommonModel;
use think\Db;

class CMApiSucLog extends CommonModel
{
	protected $table = 'b_w_api';

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
    public function getData($where = [])
    {
        if(empty($where)){
            $res = Db::table($this->table)->find();
        }else{
            $res = Db::table($this->table)->where($where)->select();
        }
        return $res;
    }



}