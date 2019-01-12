<?php

/**
 * Notes:登陆，注销
 * User: SongZhanDi
 * Date: 2018/8/29
 * Time: 18:40
 */

namespace app\prototype\controller;

use app\prototype\model\PrototypeName;
use app\prototype\validate\Upload;
use app\prototype\validate\addNewFolder;

use pclzip\PclUnZip;

class GenerateLink extends BaseController
{
	protected $m_prototypeName;
	protected $s_appRootPath;		// 上传目录
	protected $a_file_type;			// 允许上传类型
	protected $msg;
	protected $time;
	protected $msgArr;

	public function __construct(){
		parent::__construct();
		$this->m_prototypeName = new PrototypeName();
		$this->s_appRootPath = ROOT_PATH . 'public/project/';
		$this->a_file_type = ['zip','piz'];
		$this->msg = '';
		$this->time = time();
		$this->msgArr = [
						1 => '文件大小比php.ini中upload_max_filesize指定值要大',
						2 => '文件的小比表单的MAX_FILE_SIZE指定的值大',
						3 => '文件上传不完整（可能因为请求时间过长被终止）',
						4 => '没有文件随着这个请求上传',
						6 => '在php.ini中没有指定临时文件夹',
					];
	}

	/**
	 * Notes:生成链接
	 * User: SongZhanDi
	 * Date: 2018/8/31
	 * Time: 13:33
	 * @return mixed
	 */
	public function Index()
	{
		// 获取项目列表
		$where['userid'] = ['=', $this->userid];
		$where['type']   = ['=', 2];
		$list = $this->m_prototypeName->getAllList($where);

   		$data['list'] 	= $list;
		$this->assign('data',$data);
		return $this->fetch('upload/upload');
	}

	/**
	 * Notes:添加链接，修改连接
	 * User: SongZhanDi
	 * Date: 2018/8/31
	 * Time: 10:52
	 * @return \think\response\Json
	 */
	public function addUpdate()
	{
		@header('Content-type: text/html;charset=ansi');
		// @header('Content-type: text/html;charset=gb2312');
		$type 	= input('post.type','','trim');
		$pid 	= input('post.pid','','trim');
		$token 	= input("__token__");

		// 创建新连接
		if ($type == 1) {
			// 接收参数
			$title = input('post.title','','trim');
			$userid = input('post.userid','','intval');
			$password_show = input('post.password_show','','trim');

			$data = [
				'title'  => $title,
				'userid'  => $userid,
				'__token__' => $token,
			];

			// 验证参数
			$validate = new Upload();
			if (!$validate->check($data)) {
				return json(['msg'=>$validate->getError()],400);
			}

			// 上传文件
			$url = $this->upload();

			// 返回连接或错误信息
			if (!$url) return json(['msg'=>$this->msg],400);

			// 插入数据库
			$this->m_prototypeName->title    		 = $title;
			$this->m_prototypeName->userid    		 = $userid;
			$this->m_prototypeName->password_show    = $password_show;
			$this->m_prototypeName->pid    			 = $pid;
			$this->m_prototypeName->type    		 = 2;
			$this->m_prototypeName->save();

			// 获取自增ID
			$itemid = $this->m_prototypeName->itemid;
			$param = [
				'url' 		=> $url,
				'addtime' 	=> $this->time,
				'pro_url' 	=> WEB_URL . '/transferlink/' . base64_encode ($itemid) . '/' . md5($itemid . $url),
			];

			// 添加文件路径
			$pro = $this->m_prototypeName->updateInfo(['itemid'=>$itemid],$param);

			$data['title'] = $title;
			$data['password_show'] = $password_show;
			$data['pro_url'] = WEB_URL . '/transferlink/' . base64_encode ($itemid) . '/' .  md5($itemid . $url);

			if ($pro) {
				return json(['msg'=>'添加成功','data'=>$data],200);
			}

			// 添加失败，删除数据库中内容
			$this->m_prototypeName->deleteInfo(['itemid'=>$itemid]);
			return json(['msg'=>'添加失败'],400);
		}

		// 替换旧链接
		$itemid = input('post.itemid','','intval');
		$data = [
			'itemid'  => $itemid,
			'__token__' => $token,
		];

		// 验证参数
		$validate = new Upload();
		if (!$validate->check($data)) {
			return json(['msg'=>$validate->getError()],400);
		}
		// 获取旧的url
		$data = $this->m_prototypeName->get($itemid);

		if (empty($data)) return json(['msg'=>'参数错误'],400);

		// 替换文件
		$root_url_pro = $this->s_appRootPath . 'pro/' . $data['url'];
		$root_url_zip = $this->s_appRootPath . 'zip/' . $data['url'];
		$url = $this->upload($root_url_pro,$root_url_zip);

		if ($url) {
			return json(['msg'=>'替换成功','data'=>$data],200);
		}
		return json(['msg'=>'替换失败'],400);

	}

	/**
	 * Notes:上传压缩文件,解压压缩文件，返回文件地址
	 * User: SongZhanDi
	 * Date: 2018/8/30
	 * Time: 20:05
	 * @param string $root_url_zip
	 * @param string $root_url_pro
	 * @return \think\response\Json
	 */
	public function upload($root_url_pro = '',$root_url_zip = '')
	{
		// 外部访问url地址
		// 下载地址
		// 储存地址
		// 路径地址
		@header('Content-type: text/html;charset=ansi');
		// @header('Content-type: text/html;charset=gb2312');
		if ($_FILES["file"]["error"] != 0) {
			$this->msg = $this->msgArr[$_FILES["file"]["error"]];
			return false;
		}
		//获取上传文件类型
		$string = strrev($_FILES['file']['name']);
		$array = explode('.',$string);
		$type = $array[0];

		// 限制文件的格式和大小
		if (!in_array($type,$this->a_file_type)) {
			$this->msg = '文件格式只能为zip或piz';
			return false;
		}
		if ($_FILES["file"]["size"] > 1024000000) {
			$this->msg = '文件大小最大只能100M';
			return false;
		}

		// 替换旧链接
		if ($root_url_zip) {
			//转码，把utf-8转成gb2312,返回转换后的字符串， 或者在失败时返回 FALSE。
			$root_url_zip = iconv("UTF-8", "gb2312", $root_url_zip);
			//保存文件,   move_upload ed_file 将上传的文件移动到新位置
			move_uploaded_file($_FILES["file"]["tmp_name"], $root_url_zip);
			// 解压文件
			$this->delDir($root_url_pro);
			$this->replacePathExtract($root_url_zip, $root_url_pro);
			return true;
		}

		// 添加新连接
		$proRoot = $this->s_appRootPath . 'pro/' . date('Ym', $this->time);
		$zipRoot = $this->s_appRootPath . 'zip/' . date('Ym', $this->time);

		// 如果文件夹不存在，则创建文件夹
		if (!file_exists($proRoot)) {
			mkdir($proRoot, 0777, true);
			mkdir($zipRoot, 0777, true);
		}

		// 获取压缩文件名字
		$zipname = $zipRoot . '/' . md5($_FILES["file"]['name']) . $this->time . '.zip';

		//转码，把utf-8转成gb2312,返回转换后的字符串， 或者在失败时返回 FALSE。
		$zipname = iconv("UTF-8", "gb2312", $zipname);

		//保存文件,   move_upload ed_file 将上传的文件移动到新位置
		move_uploaded_file($_FILES["file"]["tmp_name"], $zipname);

		// 获取原型文件夹名字
		$proame = $proRoot . '/' . md5($_FILES["file"]['name']) . $this->time . '/';

		// 解压文件
		$this->replacePathExtract($zipname, $proame);

		// 项目url
		$url = date('Ym', $this->time). '/' . md5($_FILES["file"]['name']) . $this->time;
		return $url;
	}

	/**
	 * Notes: 删除不为空的目录
	 * User: SongZhanDi
	 * Date: 2018/9/14
	 * Time: 15:03
	 * @param $dir
	 * @return bool
	 */
	function delDir($dir) {
		@header('Content-type: text/html;charset=ansi');
		// @header('Content-type: text/html;charset=gb2312');
		if (!is_dir($dir)) {
			return false;
		}
		$handle = opendir($dir);
		while (($file = readdir($handle)) !== false) {
			if ($file != "." && $file != "..") {
				is_dir("$dir/$file") ? $this->delDir("$dir/$file") : @unlink("$dir/$file");
			}
		}
		if (readdir($handle) == false) {
			closedir($handle);
			@rmdir($dir);
		}
	}

	/**
	 * Notes:解压缩文件
	 * User: SongZhanDi
	 * Date: 2018/10/11
	 * Time: 11:34
	 * @param $zip_url			[压缩文件]
	 * @param $file_path		[添加路径]
	 * @param $file_path_remove	[移除路径]
	 */
	public function replacePathExtract($zip_url, $file_path, $file_path_remove = 'zip') {
		include_once(APP_ROOT . 'extend/pclzip/pclunzip.lib.php');
		set_time_limit(0);
		$zip = new PclUnZip($zip_url);
		$rs = @$zip->extract(PCLZIP_OPT_PATH, $file_path, PCLZIP_OPT_REMOVE_PATH, $file_path_remove);
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
	public function showFolder ()
	{
		// 接收参数
		$pid 	= input('get.pid','0','trim');

		// 获取条件
		$where['type'] 	 = ['=', 1];
		$where['pid'] 	 = ['=', $pid];
		$where['userid'] = ['=', $this->userid];

		// 获取文件夹
		$folder = $this->m_prototypeName->where($where)->order('pid','desc')->select();

		// 获得递归完的数据,遍历生成分类
		$str = '<div>';
		foreach($folder as $v){
			if ($v['childern']) {
				$str .=  '<p class="folder" box="open" itemid="' . $v['itemid'] . '">' . $v['title'] . '</p>';
			} else {
				$str .=  '<p class="folder" box="close" itemid="' . $v['itemid'] . '">' . $v['title'] . '</p>';
			}
		}

		$str .= '</div>';
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
	public function addNewFolder ()
	{
		// 接收参数
		$pid 	= input('get.pid','0','trim');
		$title 	= input('get.title','','trim');
		$token  = input("__token__");

		$data = [
			'pid'  		=> $pid,
			'title'  	=> $title,
			'__token__' => $token,
		];

		// 验证参数
		$validate = new addNewFolder();
		if (!$validate->check($data)) {
			return json(['msg'=>$validate->getError()]);
		}

		// 条件数组
		$where['userid'] = $this->userid;
		$where['type']	 = 1;
		$where['pid']    = $pid;

		// 新建文件夹名称是否重复
		$list = $this->m_prototypeName->field('title')->where($where)->select();
		for ($i = 0; $i < count($list); $i++) {
			if ($list[$i]['title'] == $title) {
				return json(['code'=>2, 'msg'=>'文件名已存在']);
			}
		}

		// 添加新文件夹
		$param = [
			'pid'  		=> $pid,
			'title'  	=> $title,
			'userid'  	=> $this->userid,
			'type'  	=> 1,
			'addtime'  	=> time(),
		];
		
		$itemid = $this->m_prototypeName->insertInfo($param);

		if ($itemid) {
			// 修改父级
			$childern = $this->m_prototypeName->getInfo(['itemid'=>$pid]);
			$param = ['childern'=>$childern['childern'] . $itemid . ','];
			$res = $this->m_prototypeName->updateInfo(['itemid'=>$pid], $param);

			if ($res) {
				return json(['code=1','msg'=>'添加成功']);
			} else {
				// 修改父级失败，删除添加的文件夹
				$this->m_prototypeName->deleteInfo($itemid);
				return json(['code'=>2,'msg'=>'添加失败']);
			}
		} else {
			return json(['code'=>2,'msg'=>'添加失败']);
		}
		// echo '<pre>';
		// print_r($title);
	}
}
