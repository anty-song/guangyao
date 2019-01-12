<?php
/**
 * 后台首页
 * Date: 18/9/14
 * Time: 上午10:22
 */
namespace app\admin\controller;

use app\admin\model\MillionsModel;
use app\admin\model\UserListModel;
use app\admin\model\AdValidModel;

class Index extends BaseController
{
    protected $millions_model;
    protected function initialize()
    {
        parent::initialize();
        $this->millions_model = new MillionsModel();
    }

    //后台首页
    public function home()
    {
        //百万红包活动列表
        $millions_activit_list = $this->millions_model->getActivityList();
        
        $this->assign('millions_activit_list',$millions_activit_list);
        //登录管理员信息（userid,username）
        $this->assign('admin_info',json_decode(session('admin_info'),true));
        return $this->fetch();
    }

    public function main()
    {
        return 'main';
    }

    //后台首页
    public function admin_mem()
    {
        //百万红包活动列表
        //$millions_activit_list = $this->millions_model->getActivityList();
        
        //$this->assign('millions_activit_list',$millions_activit_list);
        //登录管理员信息（userid,username）
        //$this->assign('admin_info',json_decode(session('admin_info'),true));
        /*
        system_push_status
        millions_guide_list
        api_count_data
        key_rand_user_list
        stock_price_num
        last_stock
        game_roll_user_list_1
        game_roll_user_list_3
        game_roll_user_list_4

        sign_access_token
        sign_jsapi_ticket
        weixin_access_token

        last_stock
        stock_price_num
        system_info
        system_push_status
        millions_guide_list
        millions_user_limit
        red_packet_last_user_uid_0
        red_packet_last_user_avatar_0
        ad_open_count_1
        last_rnd_red_uid_arr

        global_' . $key_str



        user_shop_ad_'.$ad_shop_id
        wx_status_'.$out_trade_no

        ad_order_id_'.$r['id']
        ad_open_history_' . $ad_insert_id
        ad_open_detail_'.$ad_insert_id

        home_count_'.$userip
        download_count_'.$userip
        answer_count_'.$userip
        download_btn_count_'.$userip

        ========================================================

        redis_answer_num_'.$redis_day.'_'.$uid.'_'.$g_id
        game_again_'.$tody_day.'_'.$uid
        game_once_'.$game_mem_day.'_'.$uid
        redis_game_num_'.$redis_day.'_'.$uid.'_'.$g_id
        user_auth_' . $user_id
        user_data_' . $uid
        user_game_data_' . $req['uid']
        is_click_third_game_'.$uid
        user_push_num_'.$uid
        -----------------------------------------------------
        user_auth_' . $res['uid'], $tag['auth']
        ad_comment_count_' . $adid
        "user_stock_trend7_" . $uid
        tips_show_' . $uid . date('Y_m_d')
        redpacket' . 'system' . $uid
        user_push_num_' . $uid
        redpacket' . 'game' . $uid
        home_list_system_'.$uid
        home_list_user_' . $uid
        home_list_third_' . $uid
        home_list_game_'.$uid
        home_list_millions_' . $uid
        ad_open_detail_' . $adid
        open_ad_pwd_err_num_' . $uid . '_' . $adid
        ad_open_history_' . $adid
        red_packet_open_once_' . $adid . '_' . $uid
        red_packet_open_once_' . $adid . '_' . $uid
         */
        //-------------1 系统固定的---------------
		$str_sys_key = "system_push_status,millions_guide_list,api_count_data,key_rand_user_list,stock_price_num,last_stock,sign_access_token,sign_jsapi_ticket,weixin_access_token,weixin_access_token,last_stock,stock_price_num,system_info,system_push_status,millions_guide_list,millions_user_limit,red_packet_last_user_uid_0,red_packet_last_user_avatar_0,ad_open_count_1,last_rnd_red_uid_arr,global_api_list,global_expire_time";
		$arr_sys_key = explode(",",$str_sys_key);

		$arr_sys = [];
		$memcache = get_memcache();
		foreach($arr_sys_key as $one){
            $value = $memcache->get($one);
//            $arr_sys[$one] = $value;
            echo $one." = ";
            if(is_string($value) || is_numeric($value)){
                echo $value;
            }else {
                print_r($value);
            }
            echo "<hr>";
		}

        echo "<hr>";
        echo "<hr>";

        //-------------2 广告ID相关---------------
        $str_user_key = "ad_order_id_,ad_open_history_,ad_open_detail_";
        $arr_user_key = explode(",",$str_user_key);
        $m_AdValidModel = new AdValidModel();
        $where = null;
        //$where[] = ['server_info_time','>=',get_time() - 60*60*24*1];
        $field = ['id'];
        $order = ['id'];
        $ad_list = $m_AdValidModel->getAllListPro($where, $field, $order);
        echo "<br>";
        echo "all ad :".count($ad_list);
        echo "<br>";
        echo "<hr>";
        foreach($ad_list as $two) {
            foreach($arr_user_key as $one) {
                $value = $memcache->get($one . $two['id']);
                if (!empty($value)) {
                    echo $one .$two['id']." = ";
                    if (is_string($value) || is_numeric($value)) {
                        echo $value;
                    } else {
                        print_r($value);
                    }
                    echo  "<br>";
                }
            }
            echo "<hr>";
        }

        //-------------3 用户UID相关---------------

		$str_user_key = "user_auth_,user_data_,user_game_data_,is_click_third_game_,user_push_num_,redpacketsystem,user_push_num_,redpacketgame,home_list_system_,home_list_user_,home_list_third_,home_list_game_,home_list_millions_";
		$arr_user_key = explode(",",$str_user_key);

        $m_UserListModel = new UserListModel();
        $where = null;
        $where[] = ['server_info_time','>=',get_time() - 60*60*24*1];
        $field = ['uid'];
        $order = ['uid'];
        $list_user = $m_UserListModel->getAllListPro($where, $field, $order);
        echo "<br>";
        echo "all user :".count($list_user);
        echo "<br>";
        echo "<hr>";
        echo "<br>";
        $arr_user = [];
        foreach($list_user as $two) {
            foreach($arr_user_key as $one) {
                $value = $memcache->get($one . $two['uid']);
                if (!empty($value)) {
                    echo $one.$two['uid'] ." = ";
                    if(is_string($value) || is_numeric($value)){
                        echo $value;
                    } else {
                        print_r($value);
                    }
                    echo  "<br>";
                }
//                if (!empty($value_temp)) {
//                    $arr_user[$one][$two['uid']] = $value_temp;
//                }
            }
            echo "<hr>";
        }

        $this->assign('arr_sys',$arr_sys);
        $this->assign('arr_user',$arr_user);

        //return $this->fetch();
    }
}