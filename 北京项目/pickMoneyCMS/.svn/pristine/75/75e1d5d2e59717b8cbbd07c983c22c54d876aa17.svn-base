<?php

/**
 * @Author: "Hulkzero"
 * @Date:   2018-09-18 13:44:26
 * @Email: "hulkzero@163.com"
 * @Last Modified time: 2018-09-29 18:12:39
 */
namespace app\api\model\game;

use app\api\model\CommonModel;
use think\Db;

class GamePrize extends CommonModel
{   
    /**
     * 分表使用common基类
     * 
     * @Author   Hulkzero
     * @DateTime 2018-09-15T17:05:37+0800
     * @Email    hulkzero@163.com
     * @param    integer                  $uid        [用户id]
     * @param    integer                  $g_id [奖品类型]
     * @return   [type]                               [description]
     */
    public function getMyPrizeList($uid = 0, $g_id = 0, $page = 1, $time)
    {   
        // select id，uid,p_id,g_id,p_valid_time，addtime  ，表名b_game_prize_u0，b_game_prize_list,
        // 定义查询字段
        $field = ['id', 'uid', 'p_id', 'g_id', 'p_valid_time', 'addtime'];
        // 定义查询语句
        $where = [
                    'uid'     =>  $uid,
                    'g_id'    =>  $g_id,
                    'p_status'=>  [1,2]
                 ];
        // 定义查询条件
        $order = [
                    'addtime'     =>  'desc'
                 ];
        // 查询使用联合查询
        $res = Db::table($this->table)
                ->where('p_valid_time','>',$time)
                ->where($where)
                ->order($order)
                ->page($page,20)
                ->select();
        return $res;
    }

    /**
     * 获取单条数据信息
     * @Author   Hulkzero
     * @DateTime 2018-09-22T13:39:49+0800
     * @Email    hulkzero@163.com
     * @param    array                    $where [description]
     * @return   [type]                          [description]
     */
    public function getPrizeInform($table, $id)
    {
        // 定义查询语句
        $where = [
                    'id'     =>  $id,
                 ];
        $res =  Db::table($table)
                    ->where($where)
                    ->find();
        return $res;
    }

    /**
     * 存储我的奖品
     * @Author   Hulkzero
     * @DateTime 2018-09-20T21:12:31+0800
     * @Email    hulkzero@163.com
     * @param    array                    $data [description]
     * @return   [type]                         [description]
     */
    public function saveMyPrize($data = [])
    {   
        if (empty($data)) return false;
        $res = Db::table($this->table)->strict(false)->insert($data);
        return $res;
    }

    /**
     * 修改我的奖品的状态
     * @Author   Hulkzero
     * @DateTime 2018-09-20T21:13:15+0800
     * @Email    hulkzero@163.com
     * @return   [type]                   [description]
     */
    public function updateMyPrize($table, $where = [], $data = [])
    {
        $res =  Db::table($table)
                    ->where($where)
                    ->data($data)
                    ->update();
        return $res;
    }

}
