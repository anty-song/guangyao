<?php

/**
 * @Author: "Hulkzero"
 * @Date:   2018-10-10 17:33:00
 * @Email: "hulkzero@163.com"
 * @Last Modified time: 2018-10-10 18:22:59
 */
namespace app\api\model\game;

use app\api\model\CommonModel;
use think\Db;

class GameCountDetail extends CommonModel
{   
   public function countDetailInsert($data = [])
   {
   		if (empty($data)) return false;
        $res = Db::table($this->table)->strict(false)->insert($data);
        return $res;
   } 
}
