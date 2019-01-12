<?php

namespace app\prototype\controller;
@header('Content-type: text/html;charset=ansi');

use think\Controller;
use pclzip\PclZip;

class Test extends Controller
{
    public function test ()
	{
		$this->replacePathExtract("C:\Users\Administrator\Desktop\工资条1\工资条1\工资条1.zip", "E:/xampp\htdocs\demo\prototype\public\project", "zip");
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
	public function replacePathExtract($zip_url, $file_path, $file_path_remove) {
		include_once(APP_ROOT . 'extend/pclzip/pclzip.lib.php');
		set_time_limit(0);
		$zip = new PclZip($zip_url);
		$rs = @$zip->extract(PCLZIP_OPT_PATH, $file_path, PCLZIP_OPT_REMOVE_PATH, $file_path_remove);
		dump($rs);
	}
}
