<?php
	// +----------------------------------------------------------------------
	// | ThinkPHP [ WE CAN DO IT JUST THINK ]
	// +----------------------------------------------------------------------
	// | Copyright (c) 2006~2018 http://thinkphp.cn All rights reserved.
	// +----------------------------------------------------------------------
	// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
	// +----------------------------------------------------------------------
	// | Author: liu21st <liu21st@gmail.com>
	// +----------------------------------------------------------------------

	use think\Route;
	#+++++++++++++++++++++++++++++++++++++++登陆+++++++++++++++++++++++++++++++++++++++++++++#
	// 登陆
	Route::get('login','prototype/Login/Index');
	Route::post('dologin','prototype/Login/doLogin');
	// 退出登录
	Route::get('loginout','prototype/Login/loginOut');
	#+++++++++++++++++++++++++++++++++++++++登陆+++++++++++++++++++++++++++++++++++++++++++++#


	#+++++++++++++++++++++++++++++++++++++++个人账户+++++++++++++++++++++++++++++++++++++++++++++#
	// 首页
	Route::get('/index','prototype/Index/Index');
	//修改密码
	Route::post('editpassword','prototype/Index/editPassword');
	#+++++++++++++++++++++++++++++++++++++++个人账户+++++++++++++++++++++++++++++++++++++++++++++#

	#+++++++++++++++++++++++++++++++++++++++生成链接+++++++++++++++++++++++++++++++++++++++++++++#
	// 生成链接（首页）
	Route::get('/','prototype/generateLink/Index');
	// 上传文件表单
	Route::post('addupdate','prototype/generateLink/addUpdate');
	// // 处理url
	// Route::get('transferlink/:base_itemid/:sign','prototype/generateLink/transferLink');
	// // 密码
	// Route::get('password/:base_itemid/:sign','prototype/generateLink/password');
	// // 验证密码
	// Route::post('cpassword','prototype/generateLink/cPassword');
	#+++++++++++++++++++++++++++++++++++++++生成链接+++++++++++++++++++++++++++++++++++++++++++++#

	#+++++++++++++++++++++++++++++++++++++++文件管理+++++++++++++++++++++++++++++++++++++++++++++#
	// 展示文件夹
	Route::get('showFolder','prototype/Folder/showFolder');
	// 添加文件夹
	Route::get('addNewFolder','prototype/Folder/addNewFolder');
	// 移动文件夹
	Route::get('moveFolder','prototype/Folder/moveFolder');
	// 删除项目
	Route::get('deleteFolder','prototype/Folder/deleteFolder');
	// 下载文件夹
	Route::get('downloadfolder','prototype/Folder/downloadfolder');
	#+++++++++++++++++++++++++++++++++++++++文件管理+++++++++++++++++++++++++++++++++++++++++++++#

	#+++++++++++++++++++++++++++++++++++++++账户管理+++++++++++++++++++++++++++++++++++++++++++++#
	// 管理员管理
	Route::get('admin','prototype/Admin/Index');
	// 添加用户
	Route::post('adduser','prototype/Admin/addUser');
	// 禁用用户
	Route::post('disable','prototype/Admin/disable');
	// 用户项目列表
	Route::get('homelist/:userid','prototype/Admin/homeList');
	#+++++++++++++++++++++++++++++++++++++++账户管理+++++++++++++++++++++++++++++++++++++++++++++#

	#+++++++++++++++++++++++++++++++++++++++展示项目+++++++++++++++++++++++++++++++++++++++++++++#
	// 处理url
	Route::get('transferlink/:base_itemid/:sign','prototype/ShowProject/transferLink');
	// 密码
	Route::get('password/:base_itemid/:sign','prototype/ShowProject/password');
	// 验证密码
	Route::post('cpassword','prototype/ShowProject/cPassword');
	#+++++++++++++++++++++++++++++++++++++++展示项目+++++++++++++++++++++++++++++++++++++++++++++#

	Route::get('test','prototype/Test/test');
