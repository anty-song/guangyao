<?php
/**
 * 红包管理
 * Date: 18/9/14
 * Time: 下午1:22
 */
namespace app\admin\controller;

use think\Controller;
use app\admin\controller\BaseController;

class Bonus extends BaseController
{
    public function home()
    {
        return '红包管理';
    }
}