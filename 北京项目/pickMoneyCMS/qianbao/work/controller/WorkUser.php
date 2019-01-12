<?php

namespace app\work\controller;

use think\Controller;
use think\facade\Request;
use think\Exception;

use app\work\model\WorkUser as WorkUserModel;
use app\work\controller\BaseController;

class WorkUser extends BaseController
{

    public function __construct()
    {
        parent::__construct();
    }

      /**
     * @cc 调用不存在方法统一处理
     * @param void
     * @return void
     *
     * @author seaboyer@163.com
     * @date 2018-10-24
     * @version 1.0
     */
    public function _empty()
    {
        return "<div style='text-align: center' align='center'>error</div>";
    }

    public function index()
    {
        $arr_api_list = [];
		$this->assign('arr_api_list',$arr_api_list);        
		return $this->fetch();
    }
	
    public function task_plan_edit()
    {

		
        return $this->fetch();
    }

}
