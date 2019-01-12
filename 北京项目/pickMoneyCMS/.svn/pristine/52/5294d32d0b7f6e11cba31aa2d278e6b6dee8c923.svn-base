<?php

/**
 * @Author: "Hulkzero"
 * @Date:   2018-09-18 13:44:26
 * @Email: "hulkzero@163.com"
 * @Last Modified time: 2018-09-18 15:37:11
 */
namespace app\api\model\game;

use app\api\model\CommonModel;
use think\Db;

class MGameTest extends CommonModel
{	
    /**
     * 测试
     * 
     * @Author   Hulkzero
     * @DateTime 2018-09-15T17:05:37+0800
     * @Email    hulkzero@163.com
     * @param    integer                  $uid        [用户id]
     * @param    integer                  $g_id [奖品类型]
     * @return   [type]                               [description]
     */
    public function getMyTestList($uid = 0, $g_id = 0, $page = 1)
    {	
    	// select id，uid,p_id,g_id,p_valid_time，addtime  ，表名b_game_prize_u0，b_game_prize_list,
    	// 定义查询字段
    	$field = ['id', 'uid', 'p_id', 'g_id', 'p_valid_time', 'addtime'];
        // 定义查询语句
        $where = [
        			'a.uid' 	=>	$uid,
        			'a.g_id'	=>	$g_id
        		 ];
        // 定义查询条件
        $order = [
        			'a.addtime'		=>	'desc'
        		 ];
        // 查询使用联合查询
        $res = Db::table($this->table)
				->alias('a')
				->join(['b_game_prize_list'=>'b'],'a.p_id=b.id')
                ->where($where)
                ->order($order)
                ->page($page,20)
				->select();
    	return $res;
    }
}
