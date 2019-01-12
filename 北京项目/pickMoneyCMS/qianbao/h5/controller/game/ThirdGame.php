<?php
/**
 * 三方游戏-广告
 * Author: Jason
 * Date: 18/10/26
 * Time: 下午3:30
 */

namespace app\h5\controller\game;

use app\h5\model\game\ThirdGameModel;

class ThirdGame extends GameLobby
{
    protected $third_game_model;
    public function __construct()
    {
        parent::__construct();
        $this->third_game_model = new ThirdGameModel();
    }

    //三方游戏跳转和数据统计
    public function home()
    {
        //游戏ID
        $game_id = $this->request->param('gid',2,'intval');
        //用户ID用于统计用户点击，后期维护
        $uid = $this->request->param('uid',0,'intval');
        $time = $this->request->param('time',0,'intval');
        //取缓存中的三方游戏ID
        $server_sign = md5($game_id.'-'.$uid.'-'.$time);
        //sign
        $sign = $this->request->param('sign');
        // 校验数据
        if (!empty($sign) && $sign == $server_sign) {
            // 更新游戏点击数
            $this->third_game_model->upCount($game_id);
            //获取系统红包出现时间，多长时间出现一次
            $sys_time_data = $this->third_game_model->getSystemShowTime('show_time');
            // 实例化缓存
            $memcache = get_memcache();
            //记录点击30分钟失效
            $is_click_third_game_key = 'is_click_third_game_'.$uid;
            $is_click_third_game_time = $sys_time_data['show_time'] * 60;//失效时间随系统红包失效时间，分
            $memcache->set($is_click_third_game_key,$uid,false,$is_click_third_game_time);

            // 读取用户推送次数缓存
            $user_push_num_key = 'user_push_num_'.$uid;
            $user_have_push_data = $memcache->get($user_push_num_key);
            if ($user_have_push_data) {
                $user_have_push_data['push_num'] = $user_have_push_data['push_num'] + 1;
            }
            // 更新缓存----推送次数更新
            $memcache->set($user_push_num_key,$user_have_push_data,false,60*60*24);

            // 获取游戏缓存
            $system_push_status = 'system_push_status';
            $have_push_status = $memcache->get($system_push_status);//1开启；2：关闭

            // 游戏状态为启用则跳转
            if ($have_push_status['status'] == 1) {
                exit("<script>window.location.href='".$have_push_status['g_url']."'</script>");
            }

        } else {
            //校验失败
            web_return('','',101,'非法请求数据');
        }

    }
}