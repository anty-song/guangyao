<?php

/**
 * @Author   Hulkzero
 * @DateTime 2018-08-31T13:34:00+0800
 * @Email    hulkzero@163.com
 * @Explain  抓手游戏
 */

namespace app\h5\controller\game;

use app\api\model\UserList;
use think\Request;

class Tongs extends  GameLobby
{
    /**
     * 抓手游戏接口
     *
     * @return \think\Response
     */
    public function home()
    {
        //$uid = $this->request->param('uid',0,'intval');
        //中奖滚动讯息获取
        $memcache = get_memcache();//实例化memcache
        $now_time = get_time();
        $mem_day = date('Y_m_d', $now_time);
        $mem_valid_time = 5;//缓存有效期//20181102每个游戏各自缓存自己中奖名单，时间调为15-5秒
        $memcache_key = 'game_roll_user_list_3';
        $mem_user_list = $memcache->get($memcache_key);
        //缓存中没有取数据库
        if (empty($mem_user_list)) {
            $userListModel = new UserList();
            $userList = $userListModel->getRandUserList($this->uid,100,0.1,1);
//            $new_user_list = [];
//            foreach ($userList as $k=>$v) {
//                $new_user_list[$k]['roll_title'] = '恭喜<span style="color:blue;">'.$v['name'].'</span>中了<span style="color:red;">'.$v['money'].'</span>元';
//            }
            $new_user_list = $userList;
            //更新缓存
            $memcache->set($memcache_key,$new_user_list,false,$mem_valid_time);
            //数据库中的数据
            $roll_data = $new_user_list;
        } else {
            $roll_data = $mem_user_list;//缓存中的数据
        }

        /*if (!empty($g_roll_data_real) && $g_roll_data_real == 1) {
            // 中奖滚动信息，在数据库中进行查询，暂时写死
            $roll_data =    [
                ['roll_title'=>'恭喜古拉加斯中了0.3元'   , 'roll_id'  =>'1'],
                ['roll_title'=>'恭喜Zzz中了0.2元'        , 'roll_rate'=>'2'],
                ['roll_title'=>'恭喜寒风中了0.3元'       , 'roll_rate'=>'3'],
                ['roll_title'=>'恭喜猎鹰中了0.1元'       , 'roll_rate'=>'4'],
            ];
        } else {
            // 中奖滚动信息
            $roll_data =    [
                ['roll_title'=>'恭喜古拉加斯中了0.3元'  , 'roll_id'  =>'1'],
                ['roll_title'=>'恭喜Zzz中了0.2元'      , 'roll_rate'=>'2'],
                ['roll_title'=>'恭喜寒风中了0.3元'      , 'roll_rate'=>'3'],
                ['roll_title'=>'恭喜猎鹰中了0.1元'      , 'roll_rate'=>'4'],
            ];

        }*/
        $this->assign('roll_data', $roll_data);
        //模板变量赋值
        $this->assign('title','趣味抓手');
        // 游戏奖品列表数据
        $prize_data = $this->get_prize_list(3);
        // 渲染模板
        $this->assign('prize_data',$prize_data);
        //模板输出
        return $this->fetch('game/Tongs/home');
    }
}
