<?php

namespace app\api\controller;

use app\api\controller\BaseController;

use app\api\model\MillionsConfig;
use app\api\model\CMMillionsFriend;
use app\api\model\MillionsActivity;
use app\api\model\CMMillionsTask;
use app\api\model\MillionsShare;
use app\api\model\UserInfo;
use app\api\model\UserList;

use DES\QbDES;



class Millionsj extends BaseController
{
    protected $m_CMMillionsConfig;
    protected $m_CMMillionsFriend;
    protected $m_CMMillionsActivity;
    protected $m_CMMillionsTask;
    protected $m_CMMillionsShare;
    protected $m_CMUserList;
    protected $m_CMUserInfo;
    protected $is_debug;


    public function __construct()
    {
        parent::__construct();

        $this->m_CMMillionsConfig = new MillionsConfig();
        $this->m_CMMillionsFriend = new CMMillionsFriend();
        $this->m_CMMillionsActivity = new MillionsActivity();
        $this->m_CMMillionsTask = new CMMillionsTask();
        $this->m_CMUserList = new UserList();
        $this->m_CMUserInfo = new UserInfo();
        $this->m_CMMillionsShare = new MillionsShare();
    }


	/**
     * @cc 类入口文件
     * @Author   seaboyer@163.com
     * @DateTime 2018-08-30
     * @return   [type]        [description]
     */
    public function index()
    {
        $action = $this->request_action;
        if(!empty($action)){
            switch($action)
            {
                //获取用户百万红包状态
                case 'millions_user_status';
                    $this->millionsUserStatus();
                    break;
                //未领取红包页面
                case 'millions_get_packet';
                    $this->millionsGetPacket();
                    break;
                //拆红包（正在拆和已拆完）
                case 'millions_open_packet':
                    $this->millionsOpenPacket();
                    break;
                //首次拆红包
                case 'millions_first_packet':
                    $this->millionsFirstPacket();
                    break;
                //所有红包已领完界面
                case 'millions_all_get':
                    $this->millionsAllGet();
                    break;
                //提现
                case 'millions_get_cash';
                    $this->millionsGetCash();
                    break;
                //规则H5页接口
                case 'millions_rules_url':
                    $this->millionsRulesUrl();
                    break;
                //分享接口
                case 'millions_share_pic':
                    $this->millionsSharePic();
                    break;
                //好友帮拆页
                case 'millions_friend_show':
                    $this->millionsFriendShow();
                    break;
                //帮拆
                case 'millions_friend_open':
                    $this->millionsFriendOpen();
                    break;
                default:
                    break;
            }
        }else{
            $this->millionsIndex();
        }

    }


    public function millionsIndex ()
    {
        //$t_tablename = get_db_table_name('millions_friend');
        //$this->m_CMMillionsActivity->setTableName($t_tablename);
    }
/**********************************************************************************************************************/
    /**
     * @cc 获取用户百万红包状态
     * @Author   89776730@qq.com
     * @DateTime 2018-09-03
     * @return   [type]        [description]
     */
    public function millionsUserStatus ()
    {
//        $req = $this->request_param;
//        $list_data = [];
//        if (!empty($req)) {
//            //获取请求参数
//            $uid = isset($req['uid']) ? intval($req['uid']) : 0;
//            if (empty($uid)) {
//                sdk_return('',0);
//            }
//
//            //查询百万红包用户状态
//            $t_tablename = get_db_table_name('millions_task', $uid);    //获取分表表名
//            $this->m_CMMillionsTask->setTableName($t_tablename);        //设置表名
//            $time = get_time();
//            if (!empty($uid)) $where['t_uid'] = $uid;
//            $where['status'] = ['lt', 4];
//            $where['t_time_end'] = ['lt', $time];
//            $arr_expire = $this->m_CMMillionsTask->where($where)->select();
//            unset($where);
//            if (!empty($arr_expire)) {
//                foreach ($arr_expire as $k => $v) {
//                    $this->m_CMMillionsTask->updateInfo($v['id'], 7);   //更正过期任务状态
//                }
//            } else {
//                if (!empty($uid)) $where['t_uid'] = $uid;
//                $where['status'] = ['lt', 5];
//                //
//                $arr_underway = $this->m_CMMillionsTask->where($where)->select();
//                if (empty($arr_underway)) {                             //没有正在进行的任务(待拆 或 当日已领完)
//                    unset($where);
//                    $where['uid'] = $uid;
//                    $where['t_day'] = date('Ymd', get_time());
//                    $get_packet_num = $this->m_CMMillionsTask->where($where)->getCount();
//                    if ($get_packet_num < 3) {
//                        $user_status = 1;                                   //待拆
//                    } else {
//                        $user_status = 5;                                   //当日已领完
//                    }
//                } else {                                                //有正在进行的任务
//                    $user_status = 3;                                       //拆红包中（包括拆完待提现）
//                }
//                $list_data['user_status'] = $user_status;
//                sdk_return($list_data, 1);
//            }
//
//
//
//
//        }
        $list_data = Array(
            'user_status' => 1
        );
        sdk_return($list_data);
    }
/**********************************************************************************************************************/
    /**
     * @cc 未领取红包页面
     * @Author   89776730@qq.com
     * @DateTime 2018-09-03
     * @return   [type]        [description]//
     */
    public function millionsGetPacket ()
    {
//        $req = $this->request_param;
//        $list_data = [];
//        if (!empty($req)) {
//            //获取请求参数
//            $uid = isset($req['uid']) ? intval($req['uid']) : 0;
//            if(empty($uid)){
//                sdk_return('', 0);
//            }
//            //检查用户状态是否为 未领取红包状态（状态值没有小于5的 且大于5的小于3个）
//            $t_tablename = get_db_table_name('millions_task', $uid);//获取表名
//            $this->m_CMMillionsTask->setTableName($t_tablename);    //设置表名
//
//            if (!empty($uid)) $where['t_uid'] = $uid;
//            $where['status'] = ['lt', 5];
//            $num1 = $this->m_CMMillionsTask->getCount();
//            $where['status'] = ['gt', 5];
//            $num2 = $this->m_CMMillionsTask->getCount();
//
//            if (($num1 == 0) || ($num2 < 3)) {
//                //获取本次活动可能获得的最大红包金额（在配置表所有红包类型中取最大值）
//                $where['c_act_id'] = 1;
//                $where['status'] = 1;
//                $millions_money_up = $this->m_CMMillionsConfig->where($where)->max('c_money_up');
//                $list_data['money_limit'] = $millions_money_up;
//                //获取陌生人领取信息列表(从m_user_list随机拼取)
//                unset($where);
//                $where['uid'] = [['gt', 300], ['lt', 2000]];
//                $arr_res = $this->m_CMUserList->where($where)->field('nickname','uid')->order('rand()')->limit(20)->select();
//                foreach ($arr_res as $k => $v) {
//                    $avatar = get_user_avatar($v['uid'], 2);
//                    $money = randomFloat(10, 100 ,2);
//                    $user_info['name'] = $v['nickname'];
//                    $user_info['avatar'] = $avatar;
//                    $user_info['money'] = $money;
//                    $list_data['get_user_list'][] = $user_info;
//                }
//
//                sdk_return($list_data, 1);
//            } else {
//                sdk_return('', 2, '状态已改变');       //状态已发生改变
//            }
//        }


        //返回 红包金额上限 | 他人假领取记录 |
        $list_data = [
            'rules_url'=>'http://...',
            'money_limit'=> 100,
            'get_user_list'=> [
                [
                  'avatar'=> 'http://f11.baidu.com/it/u=213496470,2087183541&fm=72',
                  'name' => '王小明',
                  'money'=> '12.5'
                ],
                [
                  'avatar'=> 'http://f11.baidu.com/it/u=213496470,2087183541&fm=72',
                  'name' => '王小明',
                  'money'=> '12.5'
                ],
                [
                  'avatar'=> 'http://f11.baidu.com/it/u=213496470,2087183541&fm=72',
                  'name' => '王小明',
                  'money'=> '12.5'
                ],
                [
                  'avatar'=> 'http://f11.baidu.com/it/u=213496470,2087183541&fm=72',
                  'name' => '王小明',
                  'money'=> '12.5'
                ],
                [
                  'avatar'=> 'http://f11.baidu.com/it/u=213496470,2087183541&fm=72',
                  'name' => '王小明',
                  'money'=> '12.5'
                ]
            ]
        ];
        sdk_return($list_data);
    }
/**********************************************************************************************************************/
    /**
     * @cc 拆红包(正在拆 已拆完)
     * @Author   89776730@qq.com
     * @DateTime 2018-09-03
     * @return   [type]        [description]//
     */
    public function millionsOpenPacket ()
    {
//        if (!empty($req)) {
//            //获取请求参数
//            $uid = isset($req['uid']) ? intval($req['uid']) : 0;
//            if (empty($uid)) {
//                sdk_return('', 0);
//            }
//
//            //检查用户状态（正在拆或已拆完）
//            $t_tablename = get_db_table_name('millions_task', $uid);//获取表名
//            $this->m_CMMillionsTask->setTableName($t_tablename);    //设置表名
//            if (!empty($uid)) $where['t_uid'] = $uid;
//            $where['status'] = ['1', '3', '4', 'OR'];
//            $field = ['status', 't_money_ready', 't_money_friend', 't_time_end', 't_money_value', 't_end_time', 'id'];
//            $user_status = $this->m_CMMillionsTask->where($where)->field($field)->find();
//
//            if ($user_status['status'] == 1 || $user_status['status'] == 3) {   //正在拆
//                $list_data['is_over'] = 0;                                  //是否已拆完(未拆完)
//                $list_data['ready_money'] = $user_status['t_money_ready'];  //已拆金额
//                $deviation_money = $user_status['t_money_value'] - $user_status['t_money_ready'];
//                $list_data['deviation_money'] = $deviation_money;           //还差多少拆完
//                $list_data['expire_time'] = $user_status['t_end_time'];     //过期时间戳
//                $list_data['contribute_stock'] = '10%';                     //平分股比例
//                //好友帮拆列表
//                if ($user_status['status'] == 1) {  //好友未帮拆
//                    $list_data['friend_help_list'] = [];
//                } else {                            //好友已帮拆
//                    $f_tablename = get_db_table_name('millions_friend', $uid);//获取好友帮拆列表表名
//                    $this->m_CMMillionsFriend->setTableName($f_tablename);    //设置表名
//                    unset($where);
//                    $where['f_act_id'] = 1;
//                    $where['f_task_id'] = $user_status['id'];
//                    $field = ['f_friend_id', 'f_money'];
//                    $arr_friends = $this->m_CMMillionsFriend->where($where)->field($field)->select();
//                    foreach ($arr_friends as $k => $v) {
//                        $friend_info = [
//                            'avatar' => get_user_avatar($v['f_friend_id'], 2, 1),
//                            'money'  => $v['f_money']
//                        ];
//                        $list_data['friend_help_list'][] = $friend_info;
//                    }
//                }
//                //陌生人领取列表
//                unset($where);
//                $where['uid'] = [['gt', 300], ['lt', 2000]];
//                $arr_res = $this->m_CMUserList->where($where)->field('nickname','uid')->order('rand()')->limit(20)->select();
//                foreach ($arr_res as $k => $v) {
//                    $avatar = get_user_avatar($v['uid'], 2);
//                    $money = randomFloat(10, 100 ,2);
//                    $user_info['name'] = $v['nickname'];
//                    $user_info['avatar'] = $avatar;
//                    $user_info['money'] = $money;
//                    $list_data['others_get_list'][] = $user_info;
//                }
//                sdk_return($list_data, 1);
//            } elseif ($user_status['status'] == 4) {//已拆完待提现
//                $list_data['is_over'] = 1;                                  //是否已拆完(未拆完)
//                $list_data['ready_money'] = $user_status['t_money_value'];  //已拆金额
//                $list_data['deviation_money'] = 0;                          //还差多少拆完
//                $list_data['expire_time'] = 0;                              //过期时间戳
//                $list_data['contribute_stock'] = '10%';                     //平分股比例
//                //好友帮拆列表
//                $f_tablename = get_db_table_name('millions_friend', $uid);//获取好友帮拆列表表名
//                $this->m_CMMillionsFriend->setTableName($f_tablename);    //设置表名
//                unset($where);
//                $where['f_act_id'] = 1;
//                $where['f_task_id'] = $user_status['id'];
//                $field = ['f_friend_id', 'f_money'];
//                $arr_friends = $this->m_CMMillionsFriend->where($where)->field($field)->select();
//                foreach ($arr_friends as $k => $v) {
//                    $friend_info = [
//                        'avatar' => get_user_avatar($v['f_friend_id'], 2, 1),
//                        'money'  => $v['f_money']
//                    ];
//                    $list_data['friend_help_list'][] = $friend_info;
//                }
//                //陌生人领取列表
//                unset($where);
//                $where['uid'] = [['gt', 300], ['lt', 2000]];
//                $arr_res = $this->m_CMUserList->where($where)->field('nickname','uid')->order('rand()')->limit(20)->select();
//                foreach ($arr_res as $k => $v) {
//                    $avatar = get_user_avatar($v['uid'], 2);
//                    $money = randomFloat(10, 100 ,2);
//                    $user_info['name'] = $v['nickname'];
//                    $user_info['avatar'] = $avatar;
//                    $user_info['money'] = $money;
//                    $list_data['others_get_list'][] = $user_info;
//                }
//                sdk_return($list_data, 1);
//            } else {
//                sdk_return('', 2, '状态错误');                                            //状态错误
//            }
//        }



            //返回//  是否已拆完     | 已拆金额 | 差多少拆完 | 过期时间戳 | 帮拆人列表（头像，金额）| 假别人领取的记录（头像 昵称 金额）  | 平分股数 |
        $list_data = [
            'is_over'=> 0,
            'ready_money'=> 66,                 //已拆金额
            'deviation_money' => 13.66,         //差多少拆完
            'expire_time'=> 1536299999,         //过期时间戳
            'contribute_stock'=>0,              //平分股数百分比
            'friend_help_list'=>[               //好友帮拆列表
                [
                    'avatar'=>'http://f11.baidu.com/it/u=213496470,2087183541&fm=72',
                    'money' =>'9.99'
                ],
                [
                    'avatar'=>'http://f11.baidu.com/it/u=213496470,2087183541&fm=72',
                    'money' =>'6.66'
                ],
                [
                    'avatar'=>'http://f11.baidu.com/it/u=213496470,2087183541&fm=72',
                    'money' =>'3.33'
                ]
            ],
            'others_get_list'=>[                //陌生人领取列表
                [
                    'avatar'=>'http://f11.baidu.com/it/u=213496470,2087183541&fm=72',
                    'name'  =>'李小明',
                    'money' =>'9.99'
                ],
                [
                    'avatar'=>'http://f11.baidu.com/it/u=213496470,2087183541&fm=72',
                    'name'  =>'王小明',
                    'money' =>'6.66'
                ],
                [
                    'avatar'=>'http://f11.baidu.com/it/u=213496470,2087183541&fm=72',
                    'name'  =>'刘小丽',
                    'money' =>'3.33'
                ]
            ],
        ];
        sdk_return($list_data);
    }
/**********************************************************************************************************************/
    /**
     * @cc 第一次拆红包
     * @Author   89776730@qq.com
     * @DateTime 2018-09-10
     * @return   [type]        [description]
     */
    /*public function millionsFirstPacket () {
        if (!empty($req)) {
            //获取请求参数
            $uid = isset($req['uid']) ? intval($req['uid']) : 0;
            if (empty($uid)) {
                sdk_return('', 0);
            }

            //检查用户状态是否为 未领取红包状态（状态值没有小于5的 且大于5的小于3个）
            $t_tablename = get_db_table_name('millions_task', $uid);//获取表名
            $this->m_CMMillionsTask->setTableName($t_tablename);    //设置表名

            if (!empty($uid)) $where['t_uid'] = $uid;
            $where['status'] = ['lt', 5];
            $num1 = $this->m_CMMillionsTask->getCount();
            $where['status'] = ['gt', 5];
            $num2 = $this->m_CMMillionsTask->getCount();

            if (($num1 == 0) || ($num2 < 3)) {
                //获取红包过期时长和需要邀请人数
                $where['id'] = 1;
                $where['status'] = 1;
                $field = ['a_expire_time', 'a_user_limit'];
                $arr_expire = $this->m_CMMillionsActivity->where($where)->field($field)->find();
                $expire = $arr_expire['a_expire_time'];     //过期时间时长
                $user_limit = $arr_expire['a_user_limit'];  //需要邀请人数
                //获取红包配置表配置
                $where['c_act_id'] = 1;
                $where['status'] = 1;
                $field = ['c_money_up', 'c_money_down', 'c_radio', 'id'];
                $order = 'c_packet_no';
                $arr_config = $this->m_CMMillionsConfig->where($where)->field($field)->order($order)->select();
                foreach ($arr_config as $k => $v) {
                    $n = mt_rand(1, 100);
                    if ($n > 100 - $v['c_radio'] && $n < 100) {
                        $money_up = $v['c_money_up'];       //红包金额上限
                        $money_down = $v['c_money_down'];   //红包金额下限
                        $config_id = $v['id'];
                        break;
                    }
                }

                $money_value = mt_rand($money_up, $money_down);//红包总金额
                $money_my = randomFloat(5, 8, 2);              //我拆的金额
                $deviation_money = $money_value - $money_my;   //差多少拆完

                //插入任务记录
                $data = [
                    't_act_id'       => 1,
                    't_config_id'    => $config_id,
                    't_uid'          => $uid,
                    't_day'          => date('Ymd', time()),
                    't_money_value'  => $money_value,
                    't_money_my'     => $money_my,
                    't_money_ready'  => $money_my,
                    't_money_friend' => 0,
                    't_need_count'   => $user_limit,
                    't_ready_count'  => 0,
                    'addtime'        => time(),
                    't_time_end'     => time() + $expire,
                    'status'         => 1
                ];
                $this->m_CMMillionsTask->save($data);

                //返回数据
                $list_data['is_over'] = 0;                          //是否领完
                $list_data['ready_money'] = $money_my;              //已领金额
                $list_data['deviation_money'] = $deviation_money;   //还差多少领完
                $list_data['expire_money'] = $data['t_time_end'];   //过期时间戳
                $list_data['contribute_stock'] = '';                //分股比例
                $list_data['friend_help_list'] = [];                //好友帮助列表

                //他人领取列表
                unset($where);
                $where['uid'] = [['gt', 300], ['lt', 2000]];
                $arr_res = $this->m_CMUserList->where($where)->field('nickname','uid')->order('rand()')->limit(20)->select();
                foreach ($arr_res as $k => $v) {
                    $avatar = get_user_avatar($v['uid'], 2);
                    $money = randomFloat(10, 100 ,2);
                    $user_info[] = $v['nickname'];
                    $user_info[] = $avatar;
                    $user_info[] = $money;
                    $list_data['others_get_list'][] = $user_info;
                }
                sdk_return($list_data, 1);
            } else {
                sdk_return('', 0, '状态不对');
            }
        }
    }*/
    public function millionsFirstPacket () {
        $list_data['is_over'] = 0;                          //是否领完
        $list_data['ready_money'] = 6.66;                   //已领金额
        $list_data['deviation_money'] = 3.33;               //还差多少领完
        $list_data['expire_money'] = 1536579999;            //过期时间戳
        $list_data['contribute_stock'] = '10%';                //分股比例
        $list_data['friend_help_list'] = [];
        $list_data['others_get_list'] = [
            'avatar' => 'http://f11.baidu.com/it/u=213496470,2087183541&fm=72',
            'name'   => '飞信',
            'money'  => 3.62
        ];
        sdk_return($list_data);
    }
/**********************************************************************************************************************/
    /**
     * @cc 当天所有红包已领完
     * @Author   89776730@qq.com
     * @DateTime 2018-09-06
     * @return   [type]        [description]
     */
    public function millionsAllGet ()
    {
//        if (!empty($req)) {
//            //获取请求参数
//            $uid = isset($req['uid']) ? intval($req['uid']) : 0;
//            if (empty($uid)) {
//                sdk_return('', 0);
//            }
//
//            //判断今天三个红包是否已经全部获得
//            $t_tablename = get_db_table_name('millions_task', $uid);
//            $this->m_CMMillionsTask->setTableName($t_tablename);
//            $where['t_uid'] = $uid;
//            $where['day'] = date('Ymd', get_time());
//            $today_count = $this->m_CMMillionsTask->where($where)->getCount();
//            if ($today_count < 4 && $today_count > -1) {
//                //每天最多获取几个红包
//                unset($where);
//                $where['id'] = 1;
//                $where['status'] = 1;
//                $packet_limit = $this->m_CMMillionsActivity->where()->field('a_user_limit')->find();
//                //已获取金额
//                unset($where);
//                $field = [
//                    'sum(a_user_limit)' => 'all_money'
//                ];
//                $where['t_uid'] = $uid;
//                $where['status'] = 6;
//                $all_money = $this->m_CMMillionsTask->where($where)->field($field)->find();
//                //返回数据
//                $list_data['packet_limit'] = $packet_limit['a_user_limit'];
//                $list_data['money'] = $all_money['all_money'];
//
//                sdk_return($list_data, 1);
//            } else {
//                sdk_return('', 2, '红包数量已大于三个');
//            }
//
//
//        } else {
//            sdk_return('', 2, '请求错误');
//        }
        //返回 每天最多领几个 | 累计领取金额
        $list_data = [
            'packet_limit'=>3,//每天最多领几个红包
            'money'       =>100//累计获取金额
        ];
        sdk_return($list_data, '1');
    }
/**********************************************************************************************************************/
    /**
     * @cc 百万红包提现(转入钱包)
     * @Author   89776730@qq.com
     * @DateTime 2018-09-03
     * @return   [type]        [description]
     */
    public function millionsGetCash ()
    {
//        if (!empty($req)) {
//            //获取请求参数
//            $uid = isset($req['uid']) ? intval($req['uid']) : 0;
//            if (empty($uid)) {
//                sdk_return('', 0);
//            }
//
//            //获取提现金额
//        } else {
//            sdk_return('', 2, '请求错误');
//        }

        //返回 是否转入成功 | 新增股数
        $list_data = [
            'is_success'=>0,//是否转入成功
            'add_stock'=>66.33//新增股数
        ];
        sdk_return($list_data);
    }
/**********************************************************************************************************************/
    /**
     * @cc 百万红包规则H5页
     * @Author   89776730@qq.com
     * @DateTime 2018-09-06
     * @return   [type]        [description]
     */
    public function millionsRulesUrl ()
    {
        //返回 规则H5页链接
        $list_data = [
            'rules_url'=>'https://www.baidu.com',//H5页链接
        ];
        sdk_return($list_data, '1');
    }
/**********************************************************************************************************************/
    /**
     * @cc 分享接口
     * @Author   89776730@qq.com
     * @DateTime 2018-09-06
     * @return   [type]        [description]
     */
    public function millionsSharePic ()
    {
        //返回 图片二级制流
        return 'AVH1eCbO71KybxZvxuKEXH8fF+WzSQUg3TAyvd2VbV3XdBZCqJk8hsyo5QJ9V6FbioEOhnCJDdh/vBVQDmu0jsGJUBreSUW7';
    }
/**********************************************************************************************************************/
    /**
     * @cc 好友帮拆接口
     * @Author   89776730@qq.com
     * @DateTime 2018-09-06
     * @return   [type]        [description]
     */
    public function millionsFriendShow ()
    {
        //返回 帮拆金额 | 新红包金额 | 已拆金额
        $list_data = [
            'to_avatar' => 'http://f11.baidu.com/it/u=213496470,2087183541&fm=72',
            'money' => 13.66,
            'friend_list' => [
                [
                    'avatar' => 'http://f11.baidu.com/it/u=213496470,2087183541&fm=72',
                    'nickname' => '王大明',
                    'money' => '2.33'
                ],
                [
                    'avatar' => 'http://f11.baidu.com/it/u=213496470,2087183541&fm=72',
                    'nickname' => '王大明',
                    'money' => '2.33'
                ]
            ],
        ];
        sdk_return($list_data, '1');
    }
/**********************************************************************************************************************/
    /**
     * @cc 好友帮拆页
     * @Author   89776730@qq.com
     * @DateTime 2018-09-10
     * @return   [type]        [description]
     */
    public function millionsFriendOpen ()
    {
        //返回 帮拆金额 | 新红包金额 | 已拆金额
        $list_data = [
            'to_name' => '王大明',
            'help_money' => 13.66,
            'new_packet' => 100,
            'ready_money' => 8.8
        ];
        sdk_return($list_data, '1');
    }
}
