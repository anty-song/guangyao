<?php

/**
 * Notes:登陆，注销
 * User: SongZhanDi
 * Date: 2018/8/29
 * Time: 18:40
 */

namespace app\prototype\controller;

use app\prototype\model\PrototypeAdmin;
use think\Request;
use app\prototype\validate\DoLogin;
use think\Session;

class Login extends BaseController
{
    public function index()
    {
		$user = Session::get('user');
		if ($user) return $this->redirect('/');
		return $this->fetch('login/login');
    }

	/**
	 * Notes:登陆操作
	 * User: SongZhanDi
	 * Date: 2018/8/28
	 * Time: 16:32
	 * @param \think\Request $request
	 * @throws \think\Exception
	 * @throws \think\db\exception\DataNotFoundException
	 * @throws \think\db\exception\ModelNotFoundException
	 * @throws \think\exception\DbException
	 */
    public function doLogin(Request $request)
    {
    	// 接收参数
		$token = input("__token__");
		$username = input('post.username','','trim');
		$password = input('post.password','','trim');

		$data = [
			'username'  => $username,
			'password'  => $password,
			'__token__' => $token,
		];

		// 验证参数
		$validate = new DoLogin();
		if (!$validate->check($data)) {
			$this->error($validate->getError(), url("/login"));
		}

		//数据库查询匹配用户信息（没有结果返回NULL）
		$data = PrototypeAdmin::where('username','=',$username)->find();

		//如果没有此用户，返回登录页弹窗（请用正确的方式登录）
		if(!$data) {
			$this->error('用户不存在');
		}

		$data = $data->toArray();
		//表单提交的密码进行MD5加密
		$password = md5($password);

		//数据库里的密码
		$dpassword = $data['password'];

		if($password != $dpassword) {
			$this->error('密码不正确');
		}

		if ($data['status'] == 2) $this->error('该账号被禁用，请联系管理员解除禁用');

		Session::set('user', $data);

		// return $this->success('登陆成功','/');
		return $this->redirect('/');
    }

	/**
	 * Notes:注销登录有
	 * User: SongZhanDi
	 * Date: 2018/8/28
	 * Time: 18:17
	 */
    public function loginOut()
	{
		// 清除session信息
		Session::delete('user');
		// return $this->success('正在退出登录...','/login');
		return $this->redirect('/login');
	}
}
