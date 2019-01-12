<?php

/**
 * @Author: "Hulkzero"
 * @Date:   2018-09-27 18:10:15
 * @Email: "hulkzero@163.com"
 * @Last Modified time: 2018-09-27 18:15:38
 */

namespace app\h5\controller\rule;

use think\Controller;
use think\Request;

class MillionRule extends Controller
{   

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * 显示游戏大厅详细信息
     *
     * @return \think\Response
     */
    public function home()
    {
        //模板变量赋值
        $this->assign('title','活动规则');

        //模板输出
        return $this->fetch('rule/million_rule');
    }
}
