<?php
// +----------------------------------------------------------------------
// | test控制器，框架自带配置
// +----------------------------------------------------------------------
// | Author: seaboyer <seaboyer@163.com>
// | Date: 2018-09-15
// +----------------------------------------------------------------------

namespace app\api\controller;

use think\Controller;

use think\facade\Request;
use app\api\model\game\GameAdList;

class MyTest extends Controller
{
    protected $m_GameAdList;													//游戏中广告模型

    public function __construct()
    {
        parent::__construct();
        $this->m_GameAdList = new GameAdList();                                    //实例化 广告 模型
    }

    /**
     * 弹出框 广告权重分配（具体广告）
     * @Author   Hulkzero
     * @DateTime 2018-09-20T09:57:41+0800
     * @Email    hulkzero@163.com
     * @return   [type]                   [description]
     */
    public function get_game_ad_popout()
    {
        $shop_ad_arr = $this->m_GameAdList->getAdList();								// 获取商户广告集合

        foreach ($shop_ad_arr as $key => $val) {
            $arr[$val['id']] = $val['weight'];
        }
        for($i=0;$i<1000;$i++) {
            //$rid = $this->get_rand($arr);                                                    //根据概率获取奖项id
            $rid = mt_rand(1,13);
            echo "<br>rid =".$rid;
        }
        // $shop_ad_id = $shop_ad_arr[$rid-1]['id']; 									//获取被选中的孩子们
        //echo "<br>rid =".$rid;
        //return $shop_ad_arr[$rid-1];
    }

    /**
     * 随机概率的计算
     * @Author   Hulkzero
     * @DateTime 2018-09-13T10:03:17+0800
     * @Email    hulkzero@163.com
     * @param    [type]                   $proArr [description]
     * @return   [type]                           [description]
     */
    public function get_rand($proArr) {
        $result = '';
        //概率数组的总概率精度
        //print_r($proArr);
        $proSum = array_sum($proArr);
        //echo "<br>proSum=".$proSum;
        //概率数组循环

        foreach ($proArr as $key => $proCur) {
            $randNum = mt_rand(1, $proSum);
            //echo "<br>randNum=".$randNum;
            if ($randNum <= $proCur) {
                $result = $key;
                break;
            } else {
                $proSum -= $proCur;
            }
        }

        unset ($proArr);
        return $result;
    }

}