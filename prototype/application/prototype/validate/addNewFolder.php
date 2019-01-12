<?php
namespace app\prototype\Validate;

use think\Validate;

class addNewFolder extends Validate
{

	protected $rule = [
			'pid'  		=> 'require',
			'title'  	=> 'require',
			'__token__' => 'token',
		];

	protected $message = [
			'pid.require'  		=> '参数不能为空',
			'title.require'  	=> '文件名不能为空',
			'__token__' 		=> '非法操作',
		];
}
