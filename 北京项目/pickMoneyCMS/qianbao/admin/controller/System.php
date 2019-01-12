<?php
/**
 * 系统管理
 * Date: 18/9/14
 * Time: 下午1:40
 */
namespace app\admin\controller;

use think\Controller;

class System extends BaseController
{
    //系统管理
    public function home()
    {
        return '系统管理';
    }
}