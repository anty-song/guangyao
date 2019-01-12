<?php

/**
 * @Author: "Hulkzero"
 * @Date:   2018-10-22 13:53:21
 * @Email: "hulkzero@163.com"
 * @Last Modified time: 2018-10-25 13:38:51
 */

namespace app\h5\controller\check;

use think\Controller;
use think\facade\Request;


class CheckOut extends Controller
{
	
	public function home()
	{
		return view('check/CheckOut/home');
	}

	public function check()
	{
                // $request_value = Request::param();      // 获取全部的request变量（经过过滤）
                // // 获取请求的参数的值
                // $action  = $request_value['action'] = 'index';
                // $reqType = $request_value['reqType'] = '1';
                // $uid     = $request_value['uid'] = 100082;

                // //获取用户缓存信息，并组合json参数
                // $memcache = get_memcache();
                // $user_data = $memcache->get('user_data_' . $uid);
                // $user_data['auth'] = '61aac24b2ee9882c0ba26016b1c4b7db';
                $data_arr = [
                				'time'	=>	'00000',
                				'uid'	=>	'0000',
                				'auth'	=>	'00000',
                			];
                var_dump($data_arr);    
                $arr = array ('a'=>1,'b'=>2,'c'=>3,'d'=>4,'e'=>5);
                $a = json_encode($arr,  JSON_BIGINT_AS_STRING, 5);
                var_dump(json_last_error(), json_last_error_msg());
                // $b = json_last_error();
                        
                echo   $a;
         


                
		// return var_dump($paramData);
	}

}
