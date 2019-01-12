<?php

/**
 * @Author: "Hulkzero"
 * @Date:   2018-09-20 21:36:49
 * @Email: "hulkzero@163.com"
 * @Last Modified time: 2018-09-20 21:39:44
 */
namespace app\api\model\game;

use app\api\model\BaseModel;
use think\Db;

class GameRedpacketList extends BaseModel
{
	protected $table = 'b_game_redpacket_list';

    protected function initialize()
    {
        parent::initialize();
    }

    public function getRedpacketList()
    {
        // 定义查询字段
        $field = ['id', 'red_min', 'red_max', 'red_weight', 'red_status', 'addtime'];
        // 定义查询语句
        $where = [
                    'red_status'    =>  1,
                 ];
        // 查询使用联合查询
        $res = Db::table($this->table)
        		->field($field)
                ->where($where)
                ->select();
        return $res;
    }

}