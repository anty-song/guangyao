<?php

/**
 * @Author: "Hulkzero"
 * @Date:   2018-09-20 09:05:52
 * @Email: "hulkzero@163.com"
 * @Last Modified time: 2018-10-11 22:40:30
 */
namespace app\api\model\game;

use app\api\model\BaseModel;
use think\Db;

class GameAdList extends BaseModel
{
	protected $table = 'b_game_ad_list';

    protected function initialize()
    {
        parent::initialize();
    }

    public function getAdList()
    {
        // 定义查询字段
        $field = ['id', 'ad_title', 'ad_type', 'android_url', 'ios_url', 'ad_img', 'ad_url', 'weight', 'ad_status', 'addtime'];
        // 定义查询语句
        $where = [
                    'ad_status'    =>  1,
                 ];
        // 查询使用联合查询
        $res = Db::table($this->table)
        		->field($field)
                ->where($where)
                ->select();
        return $res;
    }

}
