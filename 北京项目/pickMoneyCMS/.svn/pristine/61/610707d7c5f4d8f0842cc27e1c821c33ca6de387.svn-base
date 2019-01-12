<?php
/**
 * LoginController
 * User: zhushengli
 * Date: 18/9/19
 * Time: 下午4:40
 */

namespace app\admin\controller;

use think\Controller;

use app\admin\model\LoginModel;

class Login extends Controller
{
    protected $login_model;
    protected function initialize()
    {
        parent::initialize();
        $this->login_model = new LoginModel();
    }

    //后台登录
    public function home()
    {
        //如果已经登录直接跳转到后台首页
        if (admin_is_login()) {
            return redirect('admin/index/home');
        }

        return $this->fetch();
    }

    /**
     * 后台登录提交
     * @param string username [用户名,必填]
     * @param string password [密码,必填]
     * @return \think\response\Json
     */
    public function do_login()
    {
        $is_post = $this->request->isPost();
        //非post请求跳转到登录页
        if (!$is_post) {
            return redirect('admin/login/home');
        }
        $username = $this->request->param('username','','string');
        $password = $this->request->param('password','','string');
        $data['username'] = $username;
        $data['password'] = $password;
        $login_validate_res = $this->validate($data,'LoginValidate');
        if ($login_validate_res !== true) {
            return json(['status'=>0,'msg'=>$login_validate_res]);
        } else {
            //获取管理员信息
            $admin_info = $this->login_model->getMemberInfo($username);
            if (empty($admin_info)) {
                return json(['status'=>0,'msg'=>'账号不存在']);
            } else {
                if (qb_password($password,$admin_info['passsalt']) !== $admin_info['password']) {
                    return json(['status'=>0,'msg'=>'密码不正确']);
                } else {
                    //session非重要信息
                    unset($admin_info['password']);
                    unset($admin_info['passsalt']);
                    session('admin_info',json_encode($admin_info));
                    return json(['status'=>1,'msg'=>'登录成功','url'=>url('admin/index/home')]);
                }
            }
        }
    }
}