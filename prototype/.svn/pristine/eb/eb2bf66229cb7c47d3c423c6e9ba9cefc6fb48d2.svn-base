<?php

namespace app\prototype\controller;

use think\Controller;
use think\Request;
use think\Session;

class BaseController extends Controller
{
	// 登陆的userid
	public $userid = '';
	public function __construct(\think\Request $request = null)
	{
		parent::__construct($request);
		$this->checkLogin();
		$this->userid = Session::get('user')['userid'];

	}

	/**
	 * Notes:判断登陆
	 * User: SongZhanDi
	 * Date: 2018/8/28
	 * Time: 18:04
	 */
	public function checkLogin()
	{
		$user = Session::get('user');
		if (empty($user) && url() != '/prototype/login/index.html' && url() != '/prototype/login/dologin.html' && url() != '/prototype/generate_link/password.html' && url() != '/prototype/generate_link/cpassword.html') {
			return $this->redirect('/login');
		}
	}
}
