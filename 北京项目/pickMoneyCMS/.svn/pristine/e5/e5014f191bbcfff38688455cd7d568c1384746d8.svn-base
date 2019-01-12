<?php
// +----------------------------------------------------------------------
// | 百万红包分享Share
// +----------------------------------------------------------------------
// | Author: seaboyer <seaboyer@163.com>
// | Date: 2018-09-06
// +----------------------------------------------------------------------

namespace app\api\model;

use app\api\model\CommonModel;
use think\Db;

class MillionsShare extends BaseModel
{
	protected $table = 'b_millions_share';

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
    public function getData($where=array())
    {
        if(empty($where)){
            $res = Db::table($this->table)->find();
        }else{
            $res =  Db::table($this->table)->where($where)->select();
        }
        return $res;
    }

    public function getUidByUnionId ($unionid)
    {
        $where['unionid'] = $unionid;
        return Db::table($this->table)->where($where)->field('to_uid')->find();
    }

    public function getToUserId ($unionid)
    {
        $where['unionid'] = $unionid;
        return Db::table($this->table)->where($where)->field('to_uid')->find();
    }

    public function getTaskId ($unionid,$touid,$act_id)
    {
        $where['unionid'] = $unionid;
        $where['to_uid'] = $touid;
        $where['act_id'] = $act_id;



        return Db::table($this->table)->where($where)->field('taskid')->find();
    }

}