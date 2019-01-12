<?php
/**
 * 后台登录验证器
 * Author: Jason
 * Date: 18/9/20
 * Time: 上午10:38
 */

namespace app\admin\validate;

use think\Validate;

class LoginValidate extends Validate
{
    protected $rule = [
        'username' => 'require',
        'password' => 'require'
    ];

    protected $message = [
        'username.require' => '账号不能为空',
        'password.require' => '密码不能为空',
    ];

    protected $scene = [];
}