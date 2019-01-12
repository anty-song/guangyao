<?php
/**
 * 广告管理
 * Date: 18/9/14
 * Time: 上午10:22
 */
namespace app\admin\controller;

use think\Controller;
use app\admin\controller\BaseController;

use app\admin\model\AdModel;
use think\facade\Request;

class Ad extends BaseController
{

    protected $ad_model;
    protected function initialize()
    {
        parent::initialize();
        $this->ad_model = new AdModel();
    }

    /****************广告位管理****************/

    //广告管理
    public function home()
    {
//        $list = $this->ad_model->getAdList();
        //广告位展示位置列表
//        $ad_config_list = $this->ad_model->getAdConfig();
        return $this->fetch();
    }


    /****************商家广告管理****************/


    //商家广告列表
    public function advertiser()
    {
        //广告列表数据-分页数据和搜索数据
        $type = input('post.type','','trim');
        $status = input('post.status','','trim');
        $way = input('post.way','','trim');
        $keyword = input('post.keyword','','trim');
        $pagesize = input('post.pagesize',10,'trim');

        $ad_config_list         = $this->ad_model->getAdConfig();                                           // 广告位展示位置列表
        $ad_need_config_list    = $this->ad_model->getNeedAdConfig();                                       // 按类型分类
        $ad_page_list           = $this->ad_model->getAdListByPage($type,$status,$way,$keyword,$pagesize);  // 广告分页数据

        //投放状态
        $status_arr = [
            '8'=>'未投放',
            '1'=>'投放中',
            '2'=>'暂停中',
            '3'=>'已结束',
            '9'=>'已删除'
        ];

        $ad_list = $ad_page_list['list'];

        if (!empty($ad_list)) {
            //广告列表数据处理
            foreach ($ad_list as $k=>$v) {
                //广告链接处理
                if ($v['ad_type'] == 14) {
                    $ad_list[$k]['url'] = '安卓:'.$v['ad_url1'].'<br>iOS：'.$v['ad_url2'];
                } else {
                    $ad_list[$k]['url'] = $v['ad_url1'];
                }
                //出价方式
                if (!empty($v['ad_way']) && array_key_exists($v['ad_way'],$ad_config_list)) {
                    $ad_list[$k]['ad_way'] = $ad_config_list[$v['ad_way']];
                } else {
                    $ad_list[$k]['ad_way'] = '未知';
                }
                //广告状态
                if (array_key_exists($v['status'],$status_arr)) {
                    $ad_list[$k]['ad_status'] = '<span class="s'.$v['status'].'">'.$status_arr[$v['status']].'</span>';
                } else {
                    $ad_list[$k]['ad_status'] = '<span class="s8">未知状态</span>';
                }

            }
        }

        //返回表单提交数据
        $form_data = [
            'type'      => $type,
            'status'    => $status,
            'way'       => $way,
            'keyword'   => $keyword,
        ];

        $this->assign('form_data',$form_data);
        $this->assign('empty','<div style="text-align: center;font-size: 16px;line-height: 20px;margin: 10px auto;color:#c2c2c2 ">暂无数据</div>');
        $this->assign('ad_list',$ad_list);
        $this->assign('page',$ad_page_list['page']);
        $this->assign('total',$ad_page_list['total']);
        $this->assign('total_page',$ad_page_list['total_page']);
        $this->assign('ad_config_list',$ad_need_config_list);

        return $this->fetch();
    }

    //获取一条广告信息
    public function ad_detail()
    {
        $id = input('get.id','','trim');

        $ad_need_config_list    = $this->ad_model->getNeedAdConfig();  // 按类型分类

        if (empty($id)) {
            return json(['status'=>0,'msg'=>'广告ID不能为空']);
        }

        $ad_res = $this->ad_model->getAdInfo($id);

        $this->assign('ad_res',$ad_res);
        $this->assign('ad_config_list',$ad_need_config_list);

        return $this->fetch('detail');
    }

    //新增商家广告
    public function add_ad()
    {
        $data = $this->request_param;
        //广告是否长期有效
        $is_keep = input('?post.is_keep');
        if ($is_keep && input('post.is_keep') == 1) {
            $data['end_time'] = '2030-12-31';
        }
        //数据校验
        $add_ad_validate_res = $this->validate($data,'AdValidate.addAd');
        if ($add_ad_validate_res !== true) {
            return json(['status'=>0,'msg'=>$add_ad_validate_res]);
        }

        //投放类型联动数据校验
        if ($data['type'] == 14) {
            //app下载,校验IOS下载链接
            if (empty($data['ios_url'])) {
                return json(['status'=>0,'msg'=>'IOS下载链接不能为空']);
            }
            //app下载,校验Andriod下载链接
            if (empty($data['android_url'])) {
                return json(['status'=>0,'msg'=>'Andriod下载链接不能为空']);
            }
        } else {
            //图文链接,校验广告地址
            if (empty($data['ad_url'])) {
                return json(['status'=>0,'msg'=>'广告链接地址不能为空']);
            }
        }
        $data['img'] = 'https://laijianqian.oss-cn-beijing.aliyuncs.com/qb2test/up_img/weixin/0000/9ba2b207ef7d75bb9099a5435c982570x200.gif';
        //广告主表数据
        $ad_data['ad_title']   = $data['title'];
        $ad_data['ad_img']     = $data['img'];//后期调整为ajax直接提交到阿里云oss
        $ad_data['ad_url1']    = !empty($data['android_url']) ? $data['android_url'] : $data['ad_url'];
        $ad_data['ad_url2']    = !empty($data['ios_url']) ? $data['ios_url'] : $data['ad_url'];
        $ad_data['status']     = $data['status'];
        $ad_data['ad_info']    = $data['ad_info'];
        $ad_data['addtime']    = get_time();
        //广告副表数据
        $ad_info_data['advertiser_name']     = $data['name'];
        $ad_info_data['advertiser_company']  = $data['company'];
        $ad_info_data['advertiser_phone']    = $data['phone'];
        $ad_info_data['ad_position']         = $data['position'];
        $ad_info_data['ad_type']             = $data['type'];
        $ad_info_data['ad_channel']          = $data['channel'];
        $ad_info_data['start_time']          = get_time($data['start_time'].' 00:00:00');;
        $ad_info_data['end_time']            = get_time($data['end_time'].' 23:59:59');
        $ad_info_data['ad_way']              = $data['way'];
        $ad_info_data['ad_price_explain']    = $data['price_explain'];
        $ad_info_data['addtime']             = get_time();
        $ad_info_data['edittime']            = get_time();
        unset($data);

        $add_ad_res = $this->ad_model->addAd($ad_data,$ad_info_data);
        if ($add_ad_res) {
            return json(['status'=>1,'msg'=>'添加成功']);
        } else {
            return json(['status'=>0,'msg'=>'添加失败']);
        }
    }

    //设置商家广告状态，包括软删除
    public function set_ad_status()
    {
        //参数a_ids(array),商家广告id;status:广告状态
        $data = $this->request_param;
        $set_ad_validate_res = $this->validate($data,'AdValidate.setAdStatus');
        if ($set_ad_validate_res !== true) {
            return json(['status'=>0,'msg'=>$set_ad_validate_res]);
        }
        $set_ad_res = $this->ad_model->setAdStatus($data['a_ids'],$data['status']);
        if ($set_ad_res) {
            return json(['status'=>1,'msg'=>'操作成功']);
        } else {
            return json(['status'=>0,'msg'=>'操作失败']);
        }
    }

    //删除商家广告
    public function del_ad()
    {
        //参数a_ids(array)商家广告id
        $data = $this->request_param;
        $del_ad_validate_res = $this->validate($data,'AdValidate.delAd');
        if ($del_ad_validate_res !== true) {
            return json(['status'=>0,'msg'=>$del_ad_validate_res]);
        }
        $del_ad_res = $this->ad_model->delAd($data['a_ids']);
        if ($del_ad_res) {
            return json(['status'=>1,'msg'=>'操作成功']);
        } else {
            return json(['status'=>0,'msg'=>'操作失败']);
        }
    }

    /****************商家信息****************/

    //商家信息管理
    public function trader()
    {
        //默认不显示的状态（0：删除；1：启用：2：停用）
        $status = input('get.status',0);
        //每页显示条数
        $pagesize = input('get.pagesize',10);
        $list = $this->ad_model->getTraderList([['status','<>',$status]],$pagesize);

        $this->assign('list',$list['list']);
        $this->assign('empty','<tr><td colspan="7">暂无数据</td></tr>');
        $this->assign('page',$list['page']);
        $this->assign('total',$list['total']);
        $this->assign('total_page',$list['total_page']);
        return $this->fetch();
    }

    //新增商家信息
    public function add_trader()
    {
        $file = request()->file('image');
        if (empty($file)) {
            return json(['status'=>0,'msg'=>'商家Logo必须上传']);
        }
        $data['t_name'] = input('post.name','');
        $add_validate = $this->validate($data,'AdValidate.addTrader');
        if ($add_validate !== true) {
            return json(['status'=>0,'msg'=>$add_validate]);
        }
        //图片上传处理
//        $info = $file->validate(['size'=>15678,'ext'=>'jpg,png,gif'])->move('../uploads');
//        if($info){
//            // 成功上传后 获取上传信息
//            // 输出 jpg
//            echo $info->getExtension();
//            // 输出 20160820/42a79759f284b767dfcb2a0197904287.jpg
//            echo $info->getSaveName();
//            // 输出 42a79759f284b767dfcb2a0197904287.jpg
//            echo $info->getFilename();
//        }else{
//            // 上传失败获取错误信息
//            return json($file->getError());
//        }

        //临时头像，后期使用阿里云OSS上传图片处理
        $tmp_logo = 'https://laijianqian.oss-cn-beijing.aliyuncs.com/qb2test/up_img/weixin/0000/9ba2b207ef7d75bb9099a5435c982570x200.gif';
        $add_data['t_name'] = $data['t_name'];
        $add_data['t_logo'] = $tmp_logo;
        $add_data['show_num'] = 0;
        $add_data['status'] = 1;
        $add_data['add_time'] = get_time();
        unset($data);
        $add_res = $this->ad_model->addTrader($add_data);
        if ($add_res) {
            return json(['status'=>1,'msg'=>'添加成功']);
        } else {
            return json(['status'=>0,'msg'=>'添加失败']);
        }
    }

    //设置商家状态
    public function set_trader_status()
    {
        //参数t_ids(array),status
        $data = $this->request_param;
        $set_status_validate_res = $this->validate($data,'AdValidate.setTraderStatus');
        if ($set_status_validate_res !== true) {
            return json(['status'=>0,'msg'=>$set_status_validate_res]);
        }
        $set_status_res = $this->ad_model->setTraderStatus($data['t_ids'],$data['status']);
        if ($set_status_res) {
            return json(['status'=>1,'msg'=>'操作成功']);
        } else {
            return json(['status'=>0,'msg'=>'操作成功']);
        }
    }

    //删除商家信息
    public function del_trader()
    {
        //t_ids(array)商户ids
        $data = $this->request_param;
        $del_validate_res = $this->validate($data,'AdValidate.delTrader');
        if ($del_validate_res !== true) {
            return json(['status'=>0,'msg'=>$del_validate_res]);
        }

        $del_trader_res = $this->ad_model->delTrader($data['t_ids']);
        if ($del_trader_res) {
            return json(['status'=>1,'msg'=>'操作成功']);
        } else {
            return json(['status'=>0,'msg'=>'操作成功']);
        }
    }

    /**
     * 三方游戏广告配置
     */
    public function third_game()
    {
        $index_third_game   = $this->ad_model->getThirdGameByType(1);   // 首页红包三方游戏
        $game_third_game    = $this->ad_model->getThirdGameByType(2);   // 游戏大厅三方游戏

        $this->assign('index_third_game',$index_third_game);    // 首页地图红包三方游戏广告
        $this->assign('lobby_third_game',$game_third_game);     // 游戏大厅三方游戏广告

        return $this->fetch('adOtherGame');
    }

    // 设置三方游戏广告状态
    public function up_third_game()
    {
        $data = $this->request_param;
        // 参数ID必传，三方游戏ID
        if (!isset($data['id']) || empty($data['id'])) {
            return json(['status'=>0,'msg'=>'游戏ID不能为空']);
        }

        // 推送次数数据，根据push_type（1：系统；2：自定义）获取对应的push_times
        if (isset($data['push_type']) && !empty($data['push_type'])) {
           if ($data['push_type'] == 1) {
               //$upData['push_times'] = 5;//随系统红包推送,推送次数为5次
               $upData['push_times'] = $this->getSystemShowTimes();//随系统红包推送,推送次数为5次
           } else {
               if (empty($data['push_times'])) {
                   return json(['status'=>0,'msg'=>'自定义推送次数不能为空']);
               }
               $upData['push_times'] = $data['push_times'];// 自定义推送
           }
           // 推送类型：1随系统推送；2：自定义
           $upData['push_type'] = $data['push_type'];
        }

        // 三方游戏状态
        if (isset($data['status'])) {
            $upData['status'] = $data['status'];
        }

        // 三方游戏地址
        if (isset($data['url']) && !empty($data['url'])) {
            $upData['g_url'] = htmlspecialchars_decode($data['url']);
        }

        // 更新三方游戏数据
        $up_res = $this->ad_model->upThirdGame($data['id'],$upData);
        if ($up_res) {
            //操作数据更新同时更新缓存
            $system_push_status = 'system_push_status';
            $memcache = get_memcache();
            $have_push_status = $memcache->get($system_push_status);
            // 更新缓存三方游戏数据
            if (!empty($upData['g_url']) && !empty($upData['push_times'])) {
                $have_push_status['g_url'] = $upData['g_url'];          // 三方游戏url
                $have_push_status['push_times'] = $upData['push_times'];// 推送次数
            }
            //更新游戏状态
            if (!empty($upData['status'])) {
                $have_push_status['status'] = $upData['status'];        // 游戏状态
            }

            $memcache->set($system_push_status, $have_push_status, false, 60 * 60 * 3);

            return json(['status'=>1,'msg'=>'操作成功']);
        } else {
            return json(['status'=>0,'msg'=>'操作成功']);
        }
    }

    /**
     * 计算系统红包24小时内展示次数
     * @return float [展示次数]
     */
    protected function getSystemShowTimes()
    {
        $system_show_time = $this->ad_model->getSystemShowTime('show_time');
        //系统24小时内展示次数,分钟
        $show_times = round(60 / $system_show_time['show_time'] * 24);
        return $show_times;
    }


}