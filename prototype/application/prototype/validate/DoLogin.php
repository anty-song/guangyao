<?php
namespace app\prototype\validate;

use think\Validate;

class DoLogin extends Validate
{

	protected $rule = [
			'username'  => 'require|regex:/^[a-zA-Z0-9_-]{4,10}$/',
			'password'  => 'require|regex:/^[a-zA-Z0-9_-]{6,10}$/',
			'__token__' => 'token',
		];

	protected $message = [
			'username.require'  => '用户不能为空',
			'username.regex'  => '用户只能为4到10位（字母，数字，下划线，减号）',
			'password.require'  => '密码不能为空',
			'password.regex'  => '密码由6-10位的数字、字母、下划线组成',
			'__token__' => '非法操作',
		];
}
