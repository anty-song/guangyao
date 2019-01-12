<?php

namespace app\prototype\controller;

/**
 * Notes:文件管理
 * User: SongZhanDi
 * Date: 2018/10/22
 * Time: 18:40
 */

use app\prototype\model\PrototypeName;
use app\prototype\validate\addNewFolder;
use pclzip\PclZip;
use think\Validate;
use think\Request;

class Folder extends BaseController
{
	protected $m_prototypeName;

	public function __construct()
	{
		parent::__construct();
		$this->m_prototypeName = new PrototypeName();
	}

	/**
	 * Notes:展示文件夹
	 * User: SongZhanDi
	 * Date: 2018/10/22
	 * Time: 19:25
	 * @throws \think\db\exception\DataNotFoundException
	 * @throws \think\db\exception\ModelNotFoundException
	 * @throws \think\exception\DbException
	 */
	public function showFolder()
	{
		// 接收参数
		$pid = input('get.pid', '0', 'trim');

		// 获取条件
		$where['type']   = ['=', 1];
		$where['pid']    = ['=', $pid];
		$where['userid'] = ['=', $this->userid];

		// 获取文件夹
		$folder = $this->m_prototypeName->where($where)->order('pid', 'desc')->select();

		// 获得递归完的数据,遍历生成分类
		$str = '<ul>';
		foreach ($folder as $v) {
			// 获取导航数组
			$arr = familytree($v['pid']);

			// 将数组倒序
			$arr = array_reverse($arr, true);

			// 获取导航
			$strRoute = '';
			if (!empty($arr) && $v['pid'] > 0) {
				foreach ($arr as $k1 => $v1) {
					$strRoute .= $v1['title'] . '>';
				}
			}
			// 文件夹下是否有目录
			if (!$this->checkFolderEmpty($v['itemid'], $this->userid)) {
				$str .= '<li class="" box="open" itemid="' . $v['itemid'] . '"><a><img src="/static/style/prototype/images/bags.png" alt="" route="' . $strRoute . $v['title'] . '"><span>' . $v['title'] . '</span></a></li>';
			} else {
				$str .= '<li class="" box="close" itemid="' . $v['itemid'] . '"><a><img src="/static/style/prototype/images/bags.png" alt="" route="' . $strRoute . $v['title'] . '"><span>' . $v['title'] . '</span></a></li>';
			}
		}

		$str .= '</ul>';
		echo $str;
	}

	/**
	 * Notes:添加文件夹
	 * User: SongZhanDi
	 * Date: 2018/10/23
	 * Time: 10:56
	 * @return \think\response\Json
	 * @throws \think\db\exception\DataNotFoundException
	 * @throws \think\db\exception\ModelNotFoundException
	 * @throws \think\exception\DbException
	 */
	public function addNewFolder()
	{
		// 接收参数
		$pid   = input('get.pid', '0', 'trim');
		$title = input('get.title', '', 'trim');
		$token = input("__token__");

		$data = ['pid' => $pid, 'title' => $title, '__token__' => $token,];

		// 验证参数
		$validate = new addNewFolder();
		if (!$validate->check($data)) {
			return json(['code' => 2, 'msg' => $validate->getError()]);
		}

		// 条件数组
		$where['userid'] = $this->userid;
		$where['type']   = 1;
		$where['pid']    = $pid;

		// 新建文件夹名称是否重复
		$list = $this->m_prototypeName->field('title')->where($where)->select();
		for ($i = 0; $i < count($list); $i++) {
			if ($list[$i]['title'] == $title) {
				return json(['code' => 2, 'msg' => '文件名已存在']);
			}
		}

		// 添加新文件夹
		$param = ['pid' => $pid, 'title' => $title, 'userid' => $this->userid, 'type' => 1, 'addtime' => time(),];

		$res = $this->m_prototypeName->insertInfo($param);

		if ($res) {
			return json(['code' => 1, 'msg' => '添加成功']);
		} else {
			return json(['code' => 2, 'msg' => '添加失败']);
		}
	}

	/**
	 * Notes:移动文件夹
	 * User: SongZhanDi
	 * Date: 2018/10/23
	 * Time: 15:13
	 * @return \think\response\Json
	 * @throws \think\db\exception\DataNotFoundException
	 * @throws \think\db\exception\ModelNotFoundException
	 * @throws \think\exception\DbException
	 */
	public function moveFolder()
	{
		// 接收参数
		$pid    = input('get.pid', '0', 'trim');
		$itemid = input('get.itemid/a');

		// 获取条件字符串
		$str = implode($itemid, ',');

		if ($this->moveHierarchical($itemid, $pid, $str)) {
			return json(['code' => 2, 'msg' => '不能将文件夹移动到自身或其子目录下']);
		}

		// 移动文件夹
		$res = $this->m_prototypeName->whereIn('itemid', $str)->update(['pid' => $pid]);
		if ($res) {
			return json(['code' => 1, 'msg' => '移动成功']);
		} else {
			return json(['code' => 2, 'msg' => '移动失败']);
		}
	}

	/**
	 * Notes:删除文件夹
	 * User: SongZhanDi
	 * Date: 2018/10/24
	 * Time: 17:53
	 * @return \think\response\Json
	 */
	public function deleteFolder()
	{
		// 接收参数
		$itemid = input('get.itemid/a');

		if (empty($itemid)) return json(['code' => 2, 'msg' => '缺少参数']);

		$str = implode($itemid, ',');

		// 条件数组
		$where['userid'] = $this->userid;

		$resItemid = $this->m_prototypeName->whereIn('itemid', $str)->where($where)->delete();
		$resPid    = $this->m_prototypeName->whereIn('pid', $str)->where($where)->delete();

		if ($resItemid) {
			return json(['code' => 1, 'msg' => '删除成功']);
		} else {
			return json(['code' => 2, 'msg' => '删除失败']);
		}
	}

	/**
	 * Notes:下载文件夹
	 * User: SongZhanDi
	 * Date: 2018/10/25
	 * Time: 19:54
	 * @return \think\response\Json
	 * @throws \think\db\exception\DataNotFoundException
	 * @throws \think\db\exception\ModelNotFoundException
	 * @throws \think\exception\DbException
	 */
	public function downLoadFolder()
	{
		// 接收参数
		$itemid = input('get.itemid/a');

		if (empty($itemid)) return json(['code' => 2, 'msg' => '缺少参数']);

		// 条件数组
		$where['userid'] = $this->userid;
		$str             = implode($itemid, ',');

		// 递归获取文件夹下的项目列表
		$addr = $this->getProject($str, $where);

		// 文件夹下面为空
		if (empty($addr)) {
			return json(['code' => 2, 'msg' => '文件夹下面为空']);
		}

		// 复制文件见到临时文件夹
		$timeAddr = $this->userid . time();
		$dirname  = TEMPORARY_ROOT . $timeAddr . '/';

		@mkdir($dirname, 0700, true);

		set_time_limit(0);
		foreach ($addr as $k => $v) {
			recurse_copy($v['addr'], $dirname . iconv("UTF-8", "gb2312", $v['title']) . '_' . $k . '/');
		}

		// 将文件夹打包成压缩文件
		$zip     = $timeAddr . '.zip';
		$zipFile = $dirname . $zip;
		$resZip  = $this->compressedFolder($zipFile, $dirname, $dirname);

		if (file_exists($zipFile)) {
			$downLoadUrl = TEMPORARY_URL . $timeAddr . '/' . $zip;
			return json(['code' => 1, 'msg' => '获取下载链接成功', 'data' => $downLoadUrl]);
		} else {
			return json(['code' => 2, 'msg' => '获取下载链接失败']);
		}

		// 浏览器输出下载
		// header ("Cache-Control: max-age=0");
		// header ("Content-Description: File Transfer");
		// // 文件名
		// header ('Content-disposition: attachment; filename=' . basename ($zipFile));
		// // zip格式的
		// header ("Content-Type: application/zip");
		// // 告诉浏览器，这是二进制文件
		// header ("Content-Transfer-Encoding: binary");
		// // 告诉浏览器，文件大小
		// header ('Content-Length: ' . filesize ($zipFile));
		// // 输出文件;
		// readfile ($zipFile);
	}

	/**
	 * Notes:获取文件夹下面的项目列表
	 * User: SongZhanDi
	 * Date: 2018/10/25
	 * Time: 15:39
	 * @param $str
	 * @param $where
	 * @return array
	 * @throws \think\db\exception\DataNotFoundException
	 * @throws \think\db\exception\ModelNotFoundException
	 * @throws \think\exception\DbException
	 */
	public function getProject($str, $where)
	{
		// 设置静态数组存放路径
		static $addr = [];

		// 获取项目列表
		$list = $this->m_prototypeName->whereIn('itemid', $str)->where($where)->select();

		// 获取项目地址
		foreach ($list as $k => $v) {
			// 如果是文件夹
			if ($v['type'] == 1) {
				// 获取文件夹下面的项目列表
				$pidArr = $this->m_prototypeName->field(['itemid'])->where(['pid' => $v['itemid']])->select();

				$str = '';

				// 获取字符串条件
				foreach ($pidArr as $k1 => $v1) {
					$str .= $v1['itemid'] . ',';
				}
				$str = substr($str, 0, -1);
				$this->getProject($str, $where);
			} else {
				// 如果是路径直接存到数组
				$addr[$v['itemid']]['addr']  = PROJECT_ROOT . $v['url'];
				$addr[$v['itemid']]['title'] = $v['title'];
			}
		}

		return $addr;
	}

	/**
	 * Notes:文件夹下是否有目录
	 * User: SongZhanDi
	 * Date: 2018/10/25
	 * Time: 15:13
	 * @param $itemid
	 * @param $userid
	 * @return bool
	 * @throws \think\db\exception\DataNotFoundException
	 * @throws \think\db\exception\ModelNotFoundException
	 * @throws \think\exception\DbException
	 */
	public function checkFolderEmpty($itemid, $userid)
	{
		$where['userid'] = ['=', $userid];
		// 获取所有项目列表
		$list = $this->m_prototypeName->field('pid')->where($where)->select();

		// 文件夹下是否有目录
		for ($i = 0; $i < count($list); $i++) {
			if ($list[$i]['pid'] == $itemid) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Notes:打包压缩文件夹
	 * User: SongZhanDi
	 * Date: 2018/10/26
	 * Time: 10:26
	 * @param $zipAddr
	 * @param $files
	 * @param $pathRemove
	 */
	public function compressedFolder($zipAddr, $files, $pathRemove)
	{
		set_time_limit(0);
		include_once(APP_ROOT . 'extend/pclzip/pclzip.lib.php');
		$zip = new PclZip($zipAddr);
		$rs  = @$zip->create($files, PCLZIP_OPT_REMOVE_PATH, $pathRemove);
	}

	/**
	 * Notes:获取要移动文件和移动到的文件夹的层级关系
	 * User: SongZhanDi
	 * Date: 2018/10/29
	 * Time: 18:49
	 * @param $itemid
	 * @param $str
	 * @return bool
	 * @throws \think\db\exception\DataNotFoundException
	 * @throws \think\db\exception\ModelNotFoundException
	 * @throws \think\exception\DbException
	 */
	public function moveHierarchical($itemid, $pid, $str)
	{
		// 获取所有项目列表
		$pidArr = $this->m_prototypeName->field('pid')->where(['itemid'=>$pid])->find();

		// 获取所有项目列表
		$list = $this->m_prototypeName->field('pid')->whereIn('itemid', $str)->select();

		// 获取文件夹层级
		for ($i = 0; $i < count($itemid); $i++) {
			if ($itemid[$i] == $pid) {
				return true;
			}
		}

		// 获取文件夹层级
		for ($i = 0; $i < count($list); $i++) {
			if ($list[$i]['pid'] < $pidArr['pid']) {
				return true;
			}
		}

	}
}
