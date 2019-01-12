<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: 流年 <liu21st@gmail.com>
// +----------------------------------------------------------------------

// 应用公共文件

/**
 * NO.1
 * 家谱树的应用 ,如面包屑导航 首页 > 手机类型 > CDMA手机 >诺基亚N9
 * User: 	宋占弟
 * Date: 	2018/9/19
 * Time: 	19:35
 * @access 	public
 * @param  	string
 * @return 	string
 */
if (!function_exists('familytree')) {
	function familytree ($pid)
	{
		// 静态变量  每次初始化元数据不会消失
		static $arr = array();

		$info = \app\prototype\model\PrototypeName::get(['itemid'=>$pid]);

		$arr[] = $info;

		// pid大于0  则一定是下级分类
		if($info['pid'] > 0) {
			familytree($info['pid']);//递归
		}

		return $arr;
	}
}

/**
 * NO.2
 * 家谱树的应用 ,如面包屑导航 首页 > 手机类型 > CDMA手机 >诺基亚N9
 * User: 	宋占弟
 * Date: 	2018/9/19
 * Time: 	19:35
 * @access 	public
 * @param  	string
 * @return 	string
 */
if (!function_exists('get_navigation')) {
	function get_navigation ($url, $pid)
	{
		// 获取导航数组
		$arr = familytree($pid);

		// 将数组倒序
		$arr = array_reverse($arr, true);

		// 获取导航
		$str = '';
		if (!empty($arr) && $pid > 0) {
			foreach ($arr as $k => $v) {
				$str .= '<img src="/static/style/prototype/images/navigation.png" alt=""><a href="' . $url . $v['itemid'] . '">' . $v['title'] . '</a>';
			}
		}

		return $str;
	}
}

/**
 * NO.3
 * 复制文件夹
 * User: 	宋占弟
 * Date: 	2018/9/19
 * Time: 	19:35
 * @access 	public
 * @param  	src  [原目录]
 * @param  	dst  [复制到的目录]
 * @param  	string
 */
if (!function_exists('recurse_copy')) {
	function recurse_copy($src,$dst)
	{
		$dir = opendir($src);
		@mkdir($dst);
		while(false !== ( $file = readdir($dir)) ) {
			if (( $file != '.' ) && ( $file != '..' )) {
				if ( is_dir($src . '/' . $file) ) {
					recurse_copy($src . '/' . $file,$dst . '/' . $file);
				} else {
					copy($src . '/' . $file,$dst . '/' . $file);
				}
			}
		}
		closedir($dir);
	}
}