<?php

/**
 * Notes:项目列表，个人中心
 * User: SongZhanDi
 * Date: 2018/8/29
 * Time: 18:40
 */

namespace app\prototype\controller;

use app\prototype\model\PrototypeName;
use app\prototype\validate\EditPassword;
use app\prototype\model\PrototypeAdmin;

class Index extends BaseController
{
	protected $m_prototypeName;
	protected $m_prototypeAdmin;

	public function __construct(){
		parent::__construct();
		$this->m_prototypeName = new PrototypeName();
		$this->m_prototypeAdmin = new PrototypeAdmin();
	}

	/**
	 * Notes:项目列表
	 * User: SongZhanDi
	 * Date: 2018/8/29
	 * Time: 11:08
	 * @return mixed
	 */
    public function Index ()
	{
		// 接收参数
		$pid 				= input('get.pid','0','trim');
		$userid 			= input('get.userid',$this->userid,'trim');
		$order 				= input('get.order','desc','trim');
		$title 				= input('get.title','','trim');
		$where['userid'] 	= ['=', $userid];
		$where['title'] 	= ['like', "%$title%"];

		// 没有搜索时获取pid条件
		if (empty($title)) {
			$where['pid'] 	 	= ['=', $pid];
		}

		// 反转排序顺序
		if ($order == 1) {
			$order = 2;
		} else {
			$order = 1;
		}

		// 排序数组
		$arr = [
			1 => 'desc',
			2 => 'asc'
		];

		// 获取项目列表
		$list = $this->m_prototypeName->where($where)->order('type asc,addtime ' . $arr[$order])->select();

		// 如果不是登陆用户
		if ($userid != $this->userid) {
			$username = $this->m_prototypeAdmin->get(['userid'=>$userid]);
			$this->assign('username',$username);

			// 获取面包屑导航
			$str = get_navigation('http://' . WEB_URL . 'index?userid=' . $userid . '&pid=', $pid);
			$url = 'http://' . WEB_URL . 'index?userid=' . $userid . '&order=' . $order . '&pid=';
		} else {
			// 获取面包屑导航
			$str = get_navigation('http://' . WEB_URL . 'index?pid=', $pid);
			$url = 'http://' . WEB_URL . 'index?order=' . $order . '&pid=';
		}

		$this->assign('list',$list);
		$this->assign('str',$str);
		$this->assign('url',$url);
		$this->assign('userid',$userid);
		$this->assign('pid',$pid);
		$this->assign('order',$order);
		$this->assign('title',$title);
		return $this->fetch();
	}

	/**
	 * Notes:修改密码
	 * User: SongZhanDi
	 * Date: 2018/8/29
	 * Time: 18:35
	 * @return \think\response\Json
	 * @throws \think\Exception
	 * @throws \think\db\exception\DataNotFoundException
	 * @throws \think\db\exception\ModelNotFoundException
	 * @throws \think\exception\DbException
	 */
	public function editPassword()
	{
		// 接收参数
		$token = input("__token__");
		$ow = input('post.ow','','trim');
		$userid = input('post.userid','','intval');
		$password = input('post.password','123456','trim');
		$repassword = input('post.repassword','','trim');

		$data = [
			'userid'  => $userid,
			'repassword'  => $repassword,
			'password'    => $password,
			'__token__'   => $token,
		];

		// 验证参数
		$validate = new EditPassword();
		if (!$validate->check($data)) {
			return json(['msg'=>$validate->getError()],400);
		}

		// 修改登录用户
		if ($ow == 1) {
			//数据库查询匹配用户信息（没有结果返回NULL）
			$data = PrototypeAdmin::where('userid','=',$userid)->find();

			$data = $data->toArray();

			//数据库里的密码
			$dpassword = $data['password'];

			if(md5($password) != $dpassword) {
				return json(['msg'=>'原密码不正确'],400);
			}
		}
		$param = [
			'password'      => md5($repassword),
			'password_show' => $repassword,
		];
		// 修改密码
		$res = $this->m_prototypeAdmin->updateInfo(['userid'=>$userid],$param);

		if ($res) {
			return json(['msg'=>'修改成功'],200);
		}
	}
}
