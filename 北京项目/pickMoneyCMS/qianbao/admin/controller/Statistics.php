<?php
/**
 * 数据统计
 * Date: 18/9/14
 * Time: 下午1:43
 */

namespace app\admin\controller;

use app\admin\model\StatisticsModel;
use think\Controller;
use app\admin\controller\BaseController;

class Statistics extends BaseController
{
    protected $statistics_model;

    public function __construct()
    {
        parent::__construct();
        $this->statistics_model = new StatisticsModel();
    }

    public function home()
    {
        return 'home';
    }

    // 收支明细统计
    public function income_outlay()
    {
        $data = $this->request_param;
        $today = strtotime(date('Y-m-d',get_time())) - 1;
        //开始时间
        if (empty($data['start_time'])) {
            $today_day = date("Y-m-d",get_time());
            $start_time = strtotime($today_day." 00:00:00") - 60 * 60 * 24 * 7;
        } else {
            $start_time = get_time($data['start_time'].' 00:00:00');;
        }
        //结束时间
        if (empty($data['end_time'])) {
            $end_time = get_time();
        } else {
            $end_time = get_time($data['end_time'].' 23:59:59');
        }

        if ($start_time > $today) {
            $start_time = $today;
        }

        if ($end_time > $today) {
            $end_time = $today;
        }

        if ( $start_time < strtotime('2018-10-12')) {
            $start_time = $today;
        }

        if ( $end_time < strtotime('2018-10-12')) {
            $end_time = $today;
        }

        if ( $start_time > $end_time) {
            $start_time = $end_time;
        }

        $income_outlay_res = $this->statistics_model->getIncomeOutlayCount($start_time,$end_time);

        $this->assign('io_count',$income_outlay_res['list']);
        $this->assign('all_data_count',$income_outlay_res['all_data_count']);
        $this->assign('start_time',date('Y-m-d',$start_time));
        $this->assign('end_time',date('Y-m-d',$end_time));

        return $this->fetch('income_outlay');
    }

    /**
     * 更新收支表明细
     * @return \think\response\Json
     */
    public function up_io_data()
    {
        $data = $this->request_param;
        if (!isset($data['id']) || empty($data['id'])) {
            return json(['status'=>0,'msg'=>'缺少请求参数：id']);
        }

        $up_data = [];
        // 自有广告收入
        if (isset($data['own_fee'])) {
            $up_data['count6'] = $data['own_fee'];
        }

        // 腾讯广告收入
        if (isset($data['tencent_fee'])) {
            $up_data['count7'] = $data['tencent_fee'];
        }

        if (empty($up_data)) {
            return json(['status'=>0,'msg'=>'缺少必要参数']);
        }
        $res = $this->statistics_model->upIoData($data['id'],$up_data);

        if ($res) {
            return json(['status'=>1,'msg'=>'操作成功']);
        } else {
            return json(['status'=>0,'msg'=>'操作失败']);
        }


    }

    // 新增与日活统计
    public function new_dau()
    {
        $data = $this->request_param;
        $today = strtotime(date('Y-m-d',get_time())) - 1;
        //开始时间
        if (empty($data['start_time'])) {
            $today_day = date("Y-m-d",get_time());
            $start_time = strtotime($today_day." 00:00:00") - 60 * 60 * 24 * 7;
        } else {
            $start_time = get_time($data['start_time'].' 00:00:00');;
        }
        //结束时间
        if (empty($data['end_time'])) {
            $end_time = get_time();
        } else {
            $end_time = get_time($data['end_time'].' 23:59:59');
        }

        if ($start_time > $today) {
            $start_time = $today;
        }

        if ($end_time > $today) {
            $end_time = $today;
        }

        if ( $start_time < strtotime('2018-08-01')) {
            $start_time = $today;
        }

        if ( $end_time < strtotime('2018-08-01')) {
            $end_time = $today;
        }

        if ( $start_time > $end_time) {
            $start_time = $end_time;
        }

        $res = $this->statistics_model->getNewDauCount($start_time,$end_time);

        $this->assign('list',$res['list']);// 列表
        $this->assign('new_all',$res['new']);// 新增
        $this->assign('dau_all',$res['dau']);// 日活
        $this->assign('empty','<tr><td colspan="3">暂无数据</td></tr>');
        $this->assign('start_time',date('Y-m-d',$start_time));
        $this->assign('end_time',date('Y-m-d',$end_time));

        return $this->fetch('new_dau');
    }

    // 月度报表-地区
    public function monthly_area()
    {
        $data = $this->request_param;

        $current_month = date('Ym',strtotime(date('Y-m',get_time())."-01") - 60*60*24);// 默认上月
        if (!empty($data['month'])) {
            $month = date('Ym',get_time($data['month']));
            $m = $data['month'];
        } else {
            $month = $current_month;
            $m = date('Y-m',strtotime(date('Y-m',get_time())."-01") - 60*60*24);
        }

        if ($month > $current_month) {
            $month = $current_month;
            $m = date('Y-m',strtotime(date('Y-m',get_time())."-01") - 60*60*24);
        }

        $list = $this->statistics_model->getMonthlyArea($month);

        $this->assign('list',$list);
        $this->assign('month',$m);
        $this->assign('empty','<tr><td colspan="3">暂无数据</td></tr>');

        return $this->fetch('/statistics/monthly/monthly_area');
    }

    // 月度报表-接口
    public function monthly_api()
    {
        $data = $this->request_param;

        $current_month = date('Ym',strtotime(date('Y-m',get_time())."-01") - 60*60*24);// 默认上月
        if (!empty($data['month'])) {
            $month = date('Ym',get_time($data['month']));
            $m = $data['month'];
        } else {
            $month = $current_month;
            $m = date('Y-m',strtotime(date('Y-m',get_time())."-01") - 60*60*24);
        }

        if ($month > $current_month) {
            $month = $current_month;
            $m = date('Y-m',strtotime(date('Y-m',get_time())."-01") - 60*60*24);
        }

        $list = $this->statistics_model->getMonthlyApi($month);

        $this->assign('list',$list);
        $this->assign('month',$m);
        $this->assign('empty','<tr><td colspan="3">暂无数据</td></tr>');
        return $this->fetch('/statistics/monthly/monthly_api');
    }

    // 月度报表-时段
    public function monthly_hour()
    {
        return $this->fetch('/statistics/monthly/monthly_hour');
    }

    //百万红包数据统计
    public function million_count_old()
    {
        $data = $this->request_param;
        //开始时间
        if (empty($data['start_time'])) {
            $start_time = strtotime('2018-10-12');
        } else {
            $start_time = get_time($data['start_time'].' 00:00:00');;
        }
        //结束时间
        if (empty($data['end_time'])) {
            $end_time = get_time();
        } else {
            $end_time = get_time($data['end_time'].' 23:59:59');
        }

        $million_count_res = $this->statistics_model->getMillionCountOld($start_time,$end_time);

        //每个档位红包拆包成功率
        $successRateList = [];
        foreach ($million_count_res['successRes'] as $k=>$v){
            if ($v['c_all_task_success'] == 0 || $v['c_all_task_num'] == 0) {
                $successRateList[] = ['name'=>'红包'.($k+1),'rate'=>0];
            } else {
                $successRateList[] = ['name'=>'红包'.($k+1),'rate'=>round(($v['c_all_task_success']/$v['c_all_task_num'])*100,2)];
            }
        }

        $this->assign('openRed',$million_count_res['openRed'][0]['b']);
        $this->assign('openRedMoney',$million_count_res['openRedMoney'][0]['b']/10000);
        $this->assign('clickCount',$million_count_res['clickCount'][0]['b']);
        $this->assign('inviteSuccess',$million_count_res['inviteSuccess'][0]['b']);
        $this->assign('successRateList',$successRateList);
        $this->assign('start_time',date('Y-m-d',$start_time));
        $this->assign('end_time',date('Y-m-d',$end_time));

        return $this->fetch('million');
    }

    //百万红包数据统计v2
    public function million_count()
    {
        $data = $this->request_param;
        $today = strtotime(date('Y-m-d',get_time())) - 1;
        //开始时间
        if (empty($data['start_time'])) {
            $today_day = date("Y-m-d",get_time());
            $start_time = strtotime($today_day." 00:00:00") - 60 * 60 * 24 * 7;
        } else {
            $start_time = get_time($data['start_time'].' 00:00:00');;
        }
        //结束时间
        if (empty($data['end_time'])) {
            $end_time = get_time();
        } else {
            $end_time = get_time($data['end_time'].' 23:59:59');
        }

        if ($start_time > $today) {
            $start_time = $today;
        }

        if ($end_time > $today) {
            $end_time = $today;
        }

        if ( $start_time < strtotime('2018-10-12')) {
            $start_time = $today;
        }

        if ( $end_time < strtotime('2018-10-12')) {
            $end_time = $today;
        }

        if ( $start_time > $end_time) {
            $start_time = $end_time;
        }

        $million_count_res = $this->statistics_model->getMillionCount($start_time,$end_time);

        $this->assign('list',$million_count_res['list']);
        $this->assign('openRed',$million_count_res['open_red']);
        $this->assign('openRedMoney',$million_count_res['open_red_money']);
        $this->assign('clickCount',$million_count_res['click_count']);
        $this->assign('inviteSuccess',$million_count_res['invite_success']);
        $this->assign('inviteCost',$million_count_res['invite_cost']);
//        $this->assign('successRateList',$successRateList);
        $this->assign('start_time',date('Y-m-d',$start_time));
        $this->assign('end_time',date('Y-m-d',$end_time));

        return $this->fetch('million');
    }

    //广告数据统计
    public function ad_count()
    {
        $data = $this->request_param;
        $today = strtotime(date('Y-m-d',get_time())) - 1;
        //开始时间
        if (empty($data['start_time'])) {
            $today_day = date("Y-m-d",get_time());
            $start_time = strtotime($today_day." 00:00:00") - 60 * 60 * 24 * 7;
        } else {
            $start_time = get_time($data['start_time'].' 00:00:00');;
        }
        //结束时间
        if (empty($data['end_time'])) {
            $end_time = get_time();
        } else {
            $end_time = get_time($data['end_time'].' 23:59:59');
        }

        if ($start_time > $today) {
            $start_time = $today;
        }

        if ($end_time > $today) {
            $end_time = $today;
        }

        if ( $start_time < strtotime('2018-10-12')) {
            $start_time = $today;
        }

        if ( $end_time < strtotime('2018-10-12')) {
            $end_time = $today;
        }

        if ( $start_time > $end_time) {
            $start_time = $end_time;
        }


        $ad_count_res = $this->statistics_model->getAdvCount($start_time,$end_time);

        $this->assign('adPersons',$ad_count_res['ad_all_show']);//[0]['all_num']
        $this->assign('adShow',$ad_count_res['ad_list_show']);

        $this->assign('temp_ad_name',$ad_count_res['temp_ad_name']);
        $this->assign('temp_arr',$ad_count_res['temp_arr']);
        $this->assign('day_count',$ad_count_res['day_count']);
        $this->assign('ad_all_count',$ad_count_res['ad_all_count']);

        $this->assign('start_time',date('Y-m-d',$start_time));
        $this->assign('end_time',date('Y-m-d',$end_time));

        return $this->fetch('adver');
    }

    //趣味游戏数据统计
    public function game_count()
    {
        $data = $this->request_param;
        $today = strtotime(date('Y-m-d',get_time())) - 1;
        //开始时间
        if (empty($data['start_time'])) {
            $today_day = date("Y-m-d",get_time());
            $start_time = strtotime($today_day." 00:00:00") - 60 * 60 * 24 * 7;
        } else {
            $start_time = get_time($data['start_time'].' 00:00:00');;
        }
        //结束时间
        if (empty($data['end_time'])) {
            $end_time = get_time();
        } else {
            $end_time = get_time($data['end_time'].' 23:59:59');
        }

        if ($start_time > $today) {
            $start_time = $today;
        }

        if ($end_time > $today) {
            $end_time = $today;
        }

        if ( $start_time < strtotime('2018-10-12')) {
            $start_time = $today;
        }

        if ( $end_time < strtotime('2018-10-12')) {
            $end_time = $today;
        }

        if ( $start_time > $end_time) {
            $start_time = $end_time;
        }

        $game_count_res = $this->statistics_model->getGameCount($start_time,$end_time);

        $this->assign('list',$game_count_res['list']);
        $this->assign('noReceived',$game_count_res['no_receive']);
        $this->assign('received',$game_count_res['receive']);
        $this->assign('totalUse',$game_count_res['total_used']);
        $this->assign('gamePersons',$game_count_res['game_persons']);
        $this->assign('start_time',date('Y-m-d',$start_time));
        $this->assign('end_time',date('Y-m-d',$end_time));

        return $this->fetch('home');
    }

    //双11活动数据统计
    public function question_count()
    {
        $data = $this->request_param;
        //开始时间
        if (empty($data['start_time'])) {
            $start_time = 1541001600;//2018-11-01
        } else {
            $start_time = get_time($data['start_time'].' 00:00:00');;
        }
        //结束时间
        if (empty($data['end_time'])) {
            $end_time = get_time();
        } else {
            $end_time = get_time($data['end_time'].' 23:59:59');
        }

        $question_count_res = $this->statistics_model->getQuestionCount($start_time,$end_time);

        //每种装备的生成人数、识别人数
        $list = $question_count_res['res'];
       
        $enter_num = Intval($question_count_res['enter_num']);
        $layer_num = Intval($question_count_res['layer_num']);
        $download_open_num = Intval($question_count_res['download_open_num']);
        $download_down_num = Intval($question_count_res['download_down_num']);
        $quit_rate = $question_count_res['quit_rate'];
        $this->assign('enter_num',$enter_num);
        $this->assign('layer_num',$layer_num);
        $this->assign('download_open_num',$download_open_num);
        $this->assign('download_down_num',$download_down_num);
        $this->assign('quit_rate',$quit_rate);

        $this->assign('list',$list);
        $this->assign('start_time',date('Y-m-d',$start_time));
        $this->assign('end_time',date('Y-m-d',$end_time));
        $this->assign('empty','<tr><td colspan="8">暂无数据</td></tr>');
        return $this->fetch('question');
    }

    //双11活动数据统计 - 每日装备生成数据统计
    public function reward_log_list()
    {
        $reward_id = $this->request->param('reward_id',0,'intval');

        if(empty($reward_id)){
            $this->error('缺少参数:ID');
        }

        $data = $this->request_param;
        //开始时间
        if (empty($data['start_time'])) {
            $start_time = 1541001600;//2018-11-01
        } else {
            $start_time = get_time($data['start_time'].' 00:00:00');
        }
        //结束时间
        if (empty($data['end_time'])) {
            $end_time = get_time();
        } else {
            $end_time = get_time($data['end_time'].' 23:59:59');
        }

        if (empty($data['type'])) {
            $type = 1;//生成人数
        } else {
            $type = $data['type'];//识别人数
        }

        $res = $this->statistics_model->getRewardList($reward_id,$start_time,$end_time,$type);
        // 神秘装备每日生成/识别人数记录
        $list = $res['res'];

        // 神秘装备名称
        $title = $res['title'];
        $this->assign('list',$list);
        $this->assign('reward_id',$reward_id);
        $this->assign('title',$title);
        $this->assign('type',$type);
        $this->assign('start_time',date('Y-m-d',$start_time));
        $this->assign('end_time',date('Y-m-d',$end_time));
        $this->assign('empty','<tr><td colspan="8">暂无数据</td></tr>');

        return $this->fetch('reward_log_list');
    }

    /**
     * 初始化某日期内游戏消耗统计数据
     * 参数：day1:开始日期；day2:结束日期（2018-10-10）
     * @return \think\response\Json
     */
    public function init_game_count_day()
    {
        $data = $this->request_param;
        $day_1 = strtotime('2018-10-10');
        $day_2 = strtotime(date('Y-m-d',get_time())) - 60 * 60 * 24;
        $day1 = isset($data['day1']) && !empty($data['day1']) ? strtotime($data['day1']) : $day_1;
        $day2 = isset($data['day2']) && !empty($data['day2']) ? strtotime($data['day2']) : $day_2;
        if($day1 < $day_1){
            $day1 = $day_1;
        }
        if($day2 > $day_2){
            $day2 = $day_2;
        }
        $this->statistics_model->initGameCountBath($day1,$day2);
        return json(['status'=>1,'msg'=>"初始化{$day1}_{$day2}成功",'time'=>get_time()]);
    }

    /**
     * 初始化某日期内广告统计数据
     * 参数：day1:开始日期；day2:结束日期（2018-10-10）
     * @return \think\response\Json
     */
    public function init_adv_count_day()
    {
        $data = $this->request_param;
		$day_1 = strtotime('2018-10-10');
		$day_2 = strtotime(date('Y-m-d',get_time())) - 60 * 60 * 24;
        $day1 = isset($data['day1']) && !empty($data['day1']) ? strtotime($data['day1']) : $day_1;
		$day2 = isset($data['day2']) && !empty($data['day2']) ? strtotime($data['day2']) : $day_2;
		if($day1 < $day_1){
			$day1 = $day_1;
		}
		if($day2 > $day_2){
			$day2 = $day_2;
		}
        $this->statistics_model->initAdvCountBath($day1,$day2);
        return json(['status'=>1,'msg'=>"初始化{$day1}_{$day2}成功",'time'=>get_time()]);
    }

    /**
     * 初始化某日期内百万红包统计数据
     * 参数：day1:开始日期2018-10-10）；day2:结束日期（2018-10-11）
     * @return \think\response\Json
     */
    public function init_million_count_day()
    {
        $data = $this->request_param;
        $day_1 = strtotime('2018-10-10');
        $day_2 = strtotime(date('Y-m-d',get_time())) - 60 * 60 * 24;
        $day1 = isset($data['day1']) && !empty($data['day1']) ? strtotime($data['day1']) : $day_1;
        $day2 = isset($data['day2']) && !empty($data['day2']) ? strtotime($data['day2']) : $day_2;
        if($day1 < $day_1){
            $day1 = $day_1;
        }
        if($day2 > $day_2){
            $day2 = $day_2;
        }
        $this->statistics_model->initMillionCountBath($day1,$day2);
        return json(['status'=>1,'msg'=>"初始化{$day1}_{$day2}成功",'time'=>get_time()]);
    }

    /**
     * 初始化某日期内收入支出统计数据
     * 参数：day1:开始日期2018-10-10）；day2:结束日期（2018-10-11)
     * @return \think\response\Json
     */
    public function init_io_count_day()
    {
        $data = $this->request_param;
        $day_1 = strtotime('2018-10-10');
        $day_2 = strtotime(date('Y-m-d',get_time())) - 60 * 60 * 24;
        $day1 = isset($data['day1']) && !empty($data['day1']) ? strtotime($data['day1']) : $day_1;
        $day2 = isset($data['day2']) && !empty($data['day2']) ? strtotime($data['day2']) : $day_2;
        if($day1 < $day_1){
            $day1 = $day_1;
        }
        if($day2 > $day_2){
            $day2 = $day_2;
        }

        $this->statistics_model->initIncomeOutlayCountBath($day1,$day2);
        return json(['status'=>1,'msg'=>"初始化{$day1}_{$day2}成功",'time'=>get_time()]);
    }

    /**
     * 初始化某日期内对应统计数据
     * data中的参数为：
     * [name：初始化对应统计数据的名称]
     * [day1：开始时间--2018-10-10]
     * [day2：结束时间--2018-10-15]
     */
    public function init_count()
    {
        $data = $this->request_param;
        /*if (!isset($data['name']) || empty($data['name'])) {
            return json(['status'=>1,'msg'=>'缺少必要参数：name']);
        }*/

        $day_1 = strtotime('2018-08-01');
        $day_2 = strtotime(date('Y-m-d',get_time())) - 60 * 60 * 24;
        $day1 = isset($data['day1']) && !empty($data['day1']) ? strtotime($data['day1']) : $day_1;
        $day2 = isset($data['day2']) && !empty($data['day2']) ? strtotime($data['day2']) : $day_2;

        if($day1 < $day_1){
            $day1 = $day_1;
        }
        if($day2 > $day_2){
            $day2 = $day_2;
        }

        $i_s = get_time();
        $run_sec = 60 * 30;
        set_time_limit($run_sec);                    //最长执行时间半小时//0无限
        $this->statistics_model->initNewDauCountBath($day1,$day2);
        set_time_limit(30);                //必须恢复默认执行时间
        $i_e = get_time();
        $i_run = $i_e - $i_s;
        return json(['status'=>1,'msg'=>"初始化".date('Y-m-d',$day1)."_".date('Y-m-d',$day2)."成功".$i_run,'time'=>get_time()]);
    }
}