<?php

/**
 * Notes:管理员用户项目管理
 * User: SongZhanDi
 * Date: 2018/8/29
 * Time: 18:40
 */

namespace app\prototype\controller;

use app\prototype\model\PrototypeAdmin;
use app\prototype\model\PrototypeName;
use app\prototype\validate\AddUser;

class Admin extends BaseController
{
	protected $m_prototypeAdmin;
	protected $m_prototypeName;

	public function __construct(){
		parent::__construct();
		$this->m_prototypeAdmin = new PrototypeAdmin();
		$this->m_prototypeName = new PrototypeName();
	}

	/**
	 * Notes:管理员管理页面
	 * User: SongZhanDi
	 * Date: 2018/8/29
	 * Time: 18:40
	 * @return mixed
	 */
    public function Index()
	{
		// 获取账户列表
		$list = $this->m_prototypeAdmin->getPageList();
		$page = $list->render();
		$list = $list->toArray();
		$this->assign('list',$list['data']);
		$this->assign('page',$page);
		return $this->fetch('admin/admin');
	}

	/**
	 * Notes: 用户项目列表
	 * User: SongZhanDi
	 * Date: 2018/9/3
	 * Time: 14:10
	 * @param $userid
	 * @return mixed
	 */
	public function homeList($userid)
	{
		// 如果是登陆人操作
		if ($userid == $this->userid) return $this->redirect('/index');
		// 获取用户名
		$username = $this->m_prototypeAdmin->getInfo(['userid'=>$userid]);
		// 获取项目列表
		$list = $this->m_prototypeName->getPageList(['userid'=>$userid],10);
		// 获取分页
		$page = $list->render();
		$list = $list->toArray();
		$this->assign('username',$username);
		$this->assign('list',$list['data']);
		$this->assign('page',$page);
		return $this->fetch('admin/home_list');
	}

	/**
	 * Notes:禁用
	 * User: SongZhanDi
	 * Date: 2018/8/29
	 * Time: 18:53
	 * @return \think\response\Json
	 */
	public function disable()
	{
		// 接收参数
		$status = input('post.status','','trim');
		$userid = input('post.userid','','intval');

		$param = [
			'status'      => $status,
		];
		// 修改状态
		$res = $this->m_prototypeAdmin->updateInfo(['userid'=>$userid],$param);
		if ($res) {
			return json(['msg'=>'修改成功'],200);
		}
	}

	/**
	 * Notes:添加用户
	 * User: SongZhanDi
	 * Date: 2018/9/3
	 * Time: 14:31
	 * @return \think\response\Json
	 */
	public function addUser()
	{
		// 接收参数
		$username = input('post.username','','trim');
		$password = input('post.password','','trim');
		$token = input("__token__");

		$data = [
			'username'  => $username,
			'password'  => $password,
			'__token__' => $token,
		];

		// 验证参数
		$validate = new AddUser();
		if (!$validate->check($data)) {
			return json(['msg'=>$validate->getError()],400);
		}

		$param = [
			'username'  => $username,
			'password'  => md5($password),
			'password_show' => $password,
			'addtime' => time(),
		];

		// 查看用户是否存在
		$username = $this->m_prototypeAdmin->getInfo(['username'=>$username]);
		if (!empty($username)) return json(['msg'=>'用户已存在'],400);

		// 添加用户
		$res = $this->m_prototypeAdmin->insertInfo($param);

		if ($res) {
			return json(['msg'=>'添加成功'],200);
		}
	}
}
