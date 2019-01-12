<?php
/**
 * LogoutController
 * User: zhushengli
 * Date: 18/9/19
 * Time: 下午4:40
 */

namespace app\admin\controller;

class Logout extends BaseController
{
    //退出
    public function do_logout()
    {
        session('admin_info',null);
        return redirect('admin/login/home');
    }
}