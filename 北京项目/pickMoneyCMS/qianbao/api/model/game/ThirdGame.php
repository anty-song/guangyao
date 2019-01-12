<?php
/**
 * 三方游戏Model
 * Author: Jason
 * Date: 18/10/24
 * Time: 上午11:36
 */
namespace app\api\model\game;

use app\api\model\CommonModel;
use think\Db;

class ThirdGame extends CommonModel
{
    /**
     * 返回一条三方游戏数据
     * @param int $id [三方游戏ID]
     * @return array|false|null|\PDOStatement|string|\think\Model
     */
    public function getOneGame($id)
    {
        $this->setTableName('b_third_game_list');
        $where[] = ['status','=',1];//游戏状态为启用
        $where[] = ['id','=',$id];
        return $this->getInfo($where);
    }
}