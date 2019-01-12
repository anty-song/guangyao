<?php
// +----------------------------------------------------------------------
// | 所有访问为空时，异常处理控制器(config/app.php->empty_controller)
// +----------------------------------------------------------------------
// | Author: seaboyer <seaboyer@163.com>
// | Date: 2018-09-14
// +----------------------------------------------------------------------
namespace app\api\controller;

use think\facade\Request;

class Error 
{
    //空控制器：默认方法
    public function index(Request $request)
    {
        if(Request::instance()->isPost()){
            $r['time'] = get_time();
            $r['status'] = 0;
            $r['msg'] = 'error request !';
            $r['res_data'] = '';
            return json_encode($r);
        }else{
            return "<div align='center'><img src='/static/images/not_foundx6.jpg'></div>";
        }

    }

    //空控制器：其他不存在方法
    public function _empty()
    {
        if(Request::instance()->isPost()){
            $r['time'] = get_time();
            $r['status'] = 0;
            $r['msg'] = 'error request and action !';
            $r['res_data'] = '';
            return json_encode($r);
        }else{
            return "<div align='center'><img src='/static/images/not_foundx6.jpg'></div>";
        }
    }

}
