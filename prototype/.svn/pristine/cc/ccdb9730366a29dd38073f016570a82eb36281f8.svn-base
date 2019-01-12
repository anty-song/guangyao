<?php
namespace app\prototype\validate;

use think\Validate;

class EditPassword extends Validate
{

	protected $rule = [
			'userid'  => 'require|length:1,40',
			'password'  => 'require|regex:/^[a-zA-Z\d_]{6,10}$/',
			'repassword'  => 'require|regex:/^[a-zA-Z0-9_-]{6,10}$/',
			'__token__' => 'token',
		];

	protected $message = [
			'userid.require'  => '用户不能为空',
			'password.require'  => '旧密码不能为空',
			'repassword.require'  => '新密码不能为空',
			'password.regex'  => '密码由6-10位的数字、字母、下划线组成',
			'repassword.regex'  => '密码由6-10位的数字、字母、下划线组成',
			'__token__' => '非法操作',
		];
}
