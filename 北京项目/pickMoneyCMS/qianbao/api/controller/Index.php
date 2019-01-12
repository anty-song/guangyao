<?php
// +----------------------------------------------------------------------
// | 默认控制器，框架自带配置(config/app.php->default_controller)
// +----------------------------------------------------------------------
// | Author: seaboyer <seaboyer@163.com>
// | Date: 2018-09-15
// +----------------------------------------------------------------------

namespace app\api\controller;

use app\api\controller\BaseController;

use think\facade\Request;

class Index extends BaseController
{

    //默认控制器：默认方法
    public function index()
    {
        if(Request::instance()->isPost()){
            $r['time'] = get_time();
            $r['status'] = 0;
            $r['msg'] = 'error request !';
            $r['res_data'] = '';
            return json_encode($r);
        }else{
            return "<div align='center'><img src='/static/images/not_foundx6.jpg'></div>";
        }

    }


    //默认控制器：其他不存在方法
    public function _empty()
    {
        if(Request::instance()->isPost()){
            $r['time'] = get_time();
            $r['status'] = 0;
            $r['msg'] = 'error request and action !';
            $r['res_data'] = '';
            return json_encode($r);
        }else{
            return "<div align='center'><img src='/static/images/not_foundx6.jpg'></div>";
        }
    }


    //默认控制器：解密传
    public function d_jie_mi()
    {
        $request_value = Request::instance()->param();
        $req_decrypt = sdk_decrypt($request_value['s']);
        var_dump($req_decrypt);
    }

    public function get_game_ad_popout()
    {
        $shop_ad_arr = $this->m_GameAdList->getAdList();								// 获取商户广告集合

        foreach ($shop_ad_arr as $key => $val) {
            $arr[$val['id']] = $val['weight'];
        }
        $rid = $this->get_rand($arr); 													//根据概率获取奖项id
        // $shop_ad_id = $shop_ad_arr[$rid-1]['id']; 									//获取被选中的孩子们
        return $shop_ad_arr[$rid-1];
    }

}
