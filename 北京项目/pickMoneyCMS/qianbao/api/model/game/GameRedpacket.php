<?php

/**
 * @Author: "Hulkzero"
 * @Date:   2018-09-21 10:57:33
 * @Email: "hulkzero@163.com"
 * @Last Modified time: 2018-09-26 10:04:09
 */


namespace app\api\model\game;

use app\api\model\CommonModel;
use think\Db;

class GameRedpacket extends CommonModel
{ 
    /**
     * 存储我的奖品
     * @Author   Hulkzero
     * @DateTime 2018-09-20T21:12:31+0800
     * @Email    hulkzero@163.com
     * @param    array                    $data [description]
     * @return   [type]                         [description]
     */
    public function saveMyGameRedpacket($data = [])
    {   
        if (empty($data)) return false;
        $res = Db::table($this->table)->strict(false)->insert($data);
        return $res;
    }

    // 
    public function updateRedInfo($id, $param, $inc_num, $inc_price)
    {
        $where = array('id' => $id);
        return Db::table($this->table)->where($where)->inc('num',$inc_num)->inc('price',$inc_price)->update($param);
    }

    // 
    public function updateUserListInfo($uid, $param, $inc_receive_ad, $inc_stock)
    {
        $where = array('uid' => $uid);
        return Db::table($this->table)->where($where)->inc('receive_ad',$inc_receive_ad)->inc('stock',$inc_stock)->update($param);
    }

    public function getUserInfoDetail($table, $where)
    {
        return Db::table($table)->where($where)->find();
    }

    // 获取用户信息表
    public function getUserInfoList($uid)
    {
        return Db::table($this->table)
                    ->alias('a')
                    ->leftJoin('b_1_user_info b','a.uid = b.uid')
                    ->where('a.uid',$uid)
                    ->find();
    }

    // 开启事务
    public function setAffair()
    {
        return Db::startTrans();
    }

    //事务开启后，提交事务
    public function commitAffair()
    {
        return Db::commit();
    }

    // 事务开启后，回滚事务
    public function rollbackAffair()
    {
        return Db::rollback();
    }

    //关闭打动提交
    public function closeAutoCommit ()
    {
        return Db::execute('set autocommit=0');
    }

    //打开自动提交
    public function openAutoCommit ()
    {
        return Db::execute('set autocommit=1');
    }
}
