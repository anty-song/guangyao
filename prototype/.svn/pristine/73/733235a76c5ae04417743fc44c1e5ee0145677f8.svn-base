<?php

namespace app\prototype\controller;

use think\Controller;
use think\Request;

use app\prototype\model\PrototypeName;

class ShowProject extends Controller
{
	protected $m_prototypeName;

	public function __construct(){
		parent::__construct();
		$this->m_prototypeName = new PrototypeName();
	}

	/**
	 * Notes:输入密码
	 * User: SongZhanDi
	 * Date: 2018/8/31
	 * Time: 19:59
	 * @param string $base_itemid
	 * @return mixed
	 */
	public function password($base_itemid, $sign)
	{
		// 获取id
		$itemid = base64_decode($base_itemid);
		$data = $this->m_prototypeName->get($itemid);
		if (md5($itemid . $data['url']) != $sign) {
			exit('参数错误');
		}
		$this->assign('itemid',$itemid);
		$this->assign('data',$data);
		return $this->fetch('upload/password');
	}

	/**
	 * Notes:验证密码
	 * User: SongZhanDi
	 * Date: 2018/10/19
	 * Time: 15:57
	 * @return \think\response\Json
	 * @throws \think\exception\DbException
	 */

	public function cPassword()
	{
		$password_show = input('post.password_show','','trim');
		$itemid = input('post.itemid','','trim');

		$data = $this->m_prototypeName->get($itemid);
		if (empty($data)) {
			return json(['msg'=>'参数错误'],400);
		}

		//数据库里的密码
		$dpassword = $data['password_show'];

		if($password_show != $dpassword) {
			return json(['msg'=>'密码不正确'],400);
		} else {
			return json(['msg'=>'密码正确','data'=>'http://' . APP_URL . 'pro/' . $data['url']],200);
		}
	}

	/**
	 * Notes:展示资源
	 * User: SongZhanDi
	 * Date: 2018/8/31
	 * Time: 19:58
	 * @param string $base_itemid
	 * @throws \think\exception\DbException
	 */
	public function transferLink($base_itemid, $sign)
	{
		// 获取id
		$itemid = base64_decode($base_itemid);
		$data = $this->m_prototypeName->get($itemid);
		if (md5($itemid . $data['url']) != $sign) {
			exit('参数错误');
		}

		//如果设置了密码
		if ($data['password_show']) {
			return $this->redirect('/password/' . $base_itemid . '/' . $sign,302);
		}
		return $this->redirect('http://' . APP_URL . 'pro/' . $data['url'],302);
	}

	/**
	 * Notes: 解码
	 * User: SongZhanDi
	 * Date: 2018/9/3
	 * Time: 10:27
	 * @param $base_itemid
	 * @return bool|string
	 */
	public function decode($base_itemid)
	{
		$num = trim(strrchr($base_itemid, '_'),'_');
		$itemid_base = substr($base_itemid, 0,strlen($base_itemid) - ($num + strlen($num) + 1));
		$itemid = base64_decode($itemid_base);
		return $itemid;
	}
}
