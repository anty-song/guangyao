<?php
/**
 * BaseController
 * User: zhushengli
 * Date: 18/9/18
 * Time: 上午11:57
 */
namespace app\admin\controller;

use think\Controller;
use think\facade\Request;

class BaseController extends Controller
{

    protected $request_param;

    /**
     * 构造函数
     * @param Request $request Request对象
     * @access public
     */
    public function __construct()
    {
        parent::__construct();

        Request::instance()->filter(['stripslashes', 'htmlspecialchars', 'trim']);
        //Request::instance()->filter(['strip_tags','htmlspecialchars']);

        $this->request_param = Request::instance()->param();      // 获取全部的request变量（经过过滤）

//        //
//        if (is_null($request)) {
//            $request = Request::instance();
//        }
//        $this->request = $request;
//        // 控制器初始化
//        parent::__construct();

        //未登录跳转到登录页
        if (!admin_is_login()) {
//            $this->redirect('admin/login/home');
            // 登录失效，跳转到登录页
            exit("<script>parent.window.location.href='/admin/login/home'</script>");

        }
    }

}