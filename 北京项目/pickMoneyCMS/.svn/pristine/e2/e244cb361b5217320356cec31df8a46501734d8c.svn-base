<?php

namespace app\index\controller;

use think\Controller;
use think\facade\Request;
//use app\index\model\MUserList;
use think\Exception;
use think\db;


class ApiList extends Controller
{

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @cc 调用不存在方法统一处理
     * @param void
     * @return void
     *
     * @author seaboyer@163.com
     * @date 2018-09-11
     * @version 1.0
     */
    public function _empty()
    {
        return "<div style='text-align: center' align='center'>error</div>";
    }

    public function index()
    {
        return "<div style='text-align: center' align='center'>index</div>";
    }
	
    public function api_list()
    {

		

		$is_post = Request::isPost();
        $action_key = Request::post('action_key',0);
        $post_type = Request::post('postType',0);
		$uid = Request::get('uid',0);

		if(!empty($uid)){
			$memcache= get_memcache();
			$mem_auth = $memcache->get('user_auth_' . $uid);
			if(empty($mem_auth)){
				$mem_auth = md5($uid . 'abc' . config('auth_key') . '1');
				$memcache->set('user_auth_' . $uid, $mem_auth, false, 600);
			}
		}
        //服务host地址
        $server_list = config('server_api');
        //应用目录
        $app_list = config('folder_api');
		//对应api接口数据
        $arr_api_list = config('api.api_list');
        //需要的接口数据
        $need_arr = [];
		if ($is_post && !empty($action_key) && $post_type !=1) {
            foreach ($arr_api_list as $k=>$v) {
                if (in_array($action_key,$v)) {
                    $need_arr = $v;
                }
            }
            //拼装返回数据
            $actual_action = $server_list[$need_arr[3]].$app_list[$need_arr[3]].$need_arr[2].'?action='.$need_arr[0];   //实际请求地址
            $param = $need_arr[6];                                                              //所需参数
            $hostNum = $need_arr[3];                                                            //哪个服务器
            return json([
                'status'=>1,
                'msg'=>'操作成功',
                'data'=>[
                    'actualAction'=>$actual_action,
                    'param'=>$param,
                    'hostNum'=>$hostNum
                    ]
            ]);
        } else {

            $this->assign('arr_api_list',$arr_api_list);

            return $this->fetch();
        }

        $api_list = array();
		//include_once 'waibu.php';
		//print_r($arr_test_list);
		$server_list = config('server_api');
//		print_r($server_list);
		//include_once 'interface_declare.php';
//		$arr_api_list = config('api.api_list');
		//print_r($arr_api_list);
		//$api_list = get_global_data('api_list');
		//foreach ($arr_api_list as $one) {
			//$arr_list[] = get_interface_one($one);
		//}
		//print_r($api_list);

//        $this->assign('arr_api_list',$arr_api_list);

//        return $this->fetch();
    }

}
