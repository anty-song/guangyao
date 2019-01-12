<?php
// +----------------------------------------------------------------------
// | 测试演示用CMRedPacket
// +----------------------------------------------------------------------
// | Author: seaboyer <seaboyer@163.com>
// | Date: 2018-09-06
// +----------------------------------------------------------------------

namespace app\api\model;

use app\api\model\CommonModel;
use think\Db;

class CMRedPacket extends CommonModel
{
	protected $table = 'b_1_user_list';

    protected function initialize()
    {
        /*
        if (!empty($this->db_fix_ver)) { //1启用新前缀b_m_,0老的前缀b_1_
            echo $this->table . " 1<br>";
        } else {
            $this->table = 'b_1_user_list';
            echo $this->table . " 2<br>";
        }
        */
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
        if (empty($where)) {
            $res = Db::table($this->table)->find();
        } else {
            $res = Db::table($this->table)->where($where)->select();
        }
        return $res;
    }



}