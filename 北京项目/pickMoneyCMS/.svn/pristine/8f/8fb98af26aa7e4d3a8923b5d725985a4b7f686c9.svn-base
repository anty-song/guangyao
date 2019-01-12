<?php
/**
 * 数据统计model
 * User: zhushengli
 * Date: 18/9/18
 * Time: 上午9:09
 */
namespace app\admin\model;


use Think\Db;

class StatisticsModel extends BaseModel
{
    protected $config_table = 'b_millions_config';
    protected $game_ad_table = 'b_game_ad_list';
    protected $millions_count_table = 'b_millions_count';
    protected $question_reward_table = 'b_question_reward';
    protected $question_reward_data_table = 'b_question_reward_data';
    protected $question_count_table = 'b_question_count';
    protected $adv_list_table = 'b_adv_list';
    protected $adv_config_table = 'b_adv_config';
    protected function initialize()
    {
        parent::initialize();
    }

    /**
     * 百万红包数据统计
     * @param string $start_time [开始时间,时间戳]
     * @param string $end_time [结束时间,时间戳]
     * @return array
     */
    public function getMillionCountOld($start_time = '',$end_time = '')
    {
        //百万红包拆完金额sql
        $openRedMoneySql = "SELECT sum(c_103) as b FROM `b_millions_count` where addtime between $start_time and $end_time";
//        $openRedMoney = Db::table($this->millions_count_table)->whereBetweenTime('addtime',$start_time,$end_time)->sum('c_103');
        //百万红包点击数sql
        $clickCountSql = "SELECT sum(c_105) as b FROM `b_millions_count` where addtime between $start_time and $end_time";
        //邀请成功人数
        $inviteSuccessSql = "SELECT sum(c_104) as b FROM `b_millions_count` where addtime between $start_time and $end_time";
        //拆包个数统计sql
        $openRedSql = "SELECT sum(c_102) as b FROM `b_millions_count` where addtime between $start_time and $end_time";
        //百万红包拆完金额
        $openRedMoney = Db::query($openRedMoneySql);
        //百万红包点击数
        $clickCount = Db::query($clickCountSql);
        //邀请成功人数
        $inviteSuccess = Db::query($inviteSuccessSql);
        //拆红包个数
        $openRed = Db::query($openRedSql);
        //每个档位红包拆包成功率
        $successRes = Db::table($this->config_table)->where([
            ['c_act_id','=',1],
            ['status','=',1]
        ])->field('c_all_task_num,c_all_task_success')->select();
        $data = [
            'openRed'=>$openRed,
            'openRedMoney'=>$openRedMoney,
            'clickCount'=>$clickCount,
            'inviteSuccess'=>$inviteSuccess,
            'successRes' =>$successRes
        ];
        return $data;
    }

    /**
     * 双11活动数据统计
     * @param string $start_time [开始时间,时间戳]
     * @param string $end_time [结束时间,时间戳]
     * @return array
     */
    public function getQuestionCount($start_time = '',$end_time = '')
    {
        //每种装备的生成人数、识别人数
        $res = Db::table($this->question_reward_table)->select();

        // 进入活动人数
        $enter = Db::query("SELECT * FROM `b_question_count` where type=1 and createtime between $start_time and $end_time");

        // 弹层打开人数
        $layer = Db::query("SELECT count(ip) as num FROM `b_question_count` where type=2 and createtime between $start_time and $end_time");

        // 下载页打开人数
        $download_open = Db::query("SELECT count(ip) as num FROM `b_question_count` where type=3 and createtime between $start_time and $end_time");

        // 下载页下载人数
        $download_down = Db::query("SELECT count(ip) as num FROM `b_question_count` where type=4 and createtime between $start_time and $end_time");
        
        // 活动首页的退出率
        $quit_num = 0;
        foreach ($enter as $k => $v) {
            // 统计退出人数
            $where = "ip = '" . $v['ip'] . "' and type != 1 and createtime between " . $start_time . " and " . $end_time;
            $info = Db::table($this->question_count_table)->where($where)->count();
            if($info==0){
            
                $quit_num++;
            }
       
        }
   
        // 退出率
        if(count($enter)){
            $quit_rate = round(($quit_num/count($enter) * 100),2);
        }else{
            $quit_rate = 0;
        }
        
        $data = [
            'res' =>$res,
            'enter_num' =>count($enter),
            'layer_num' =>$layer[0]['num'],
            'download_open_num' =>$download_open[0]['num'],
            'download_down_num' =>$download_down[0]['num'],
            'quit_rate' =>$quit_rate,
        ];
        return $data;
    }

    /**
     * 双11活动数据统计 - 每日装备生成数据列表
     * @param string $start_time [开始时间,时间戳]
     * @param string $end_time [结束时间,时间戳]
     * @return array
     */
    public function getRewardList($reward_id,$start_time = '',$end_time = '',$type = 1)
    {
        $where = "reward_id = ".$reward_id;

        $reward_info = Db::table($this->question_reward_table)->field('title')->where($where)->find();

        if($start_time!=''&&$end_time!=''){
            $where .= " AND createtime >= ".$start_time." AND createtime <=".$end_time;
        }
        $where .= " AND type=".$type; //人数类型
        $field = "count(id) as count, FROM_UNIXTIME(createtime, '%Y-%m-%d') as datetime";
        //每种装备的生成人数、识别人数
        $res = Db::table($this->question_reward_data_table)->field($field)->where($where)->group('datetime')->select();
        
        $data['res'] = $res;
        $data['title'] = $reward_info['title'];

        return $data;
    }

    /**
     * 初始化某时间段广告统计数据
     * @param $day1 [开始日期(时间戳)]
     * @param $day2 [结束日期(时间戳)]
     */
    public function initAdvCountBath($day1,$day2)
    {
        for ($i = $day1; $i <= $day2; $i += 60 * 60 * 24){
            $this->initAdvCountDay(date('Y-m-d', $i));
        }
    }

    /**
     * 初始化某时间段游戏数据统计
     * @param $day1 [开始日期(时间戳)]
     * @param $day2 [结束日期(时间戳)]
     */
    public function initGameCountBath($day1,$day2)
    {
        for ($i = $day1; $i <= $day2; $i += 60 * 60 * 24){
            $this->initGameCountDay(date('Y-m-d', $i));
        }
    }

    /**
     * 初始化某时间段百万红包数据统计
     * @param $day1 [开始日期(时间戳)]
     * @param $day2 [结束日期(时间戳)]
     */
    public function initMillionCountBath($day1,$day2)
    {
        for ($i = $day1; $i <= $day2; $i += 60 * 60 * 24){
            $this->initMillionCountDay(date('Y-m-d', $i));
        }
    }


    /**
     * 初始化某时间段收入支出统计数据
     * @param $day1
     * @param $day2
     */
    public function initIncomeOutlayCountBath($day1,$day2)
    {
        for ($i = $day1; $i <= $day2; $i += 60 * 60 * 24){
            $this->initIncomeOutlayCountDay(date('Y-m-d', $i));
        }
    }

    /**
     * 初始化某时间段新增用户与日活统计
     * @param $day1
     * @param $day2
     */
    public function initNewDauCountBath($day1,$day2)
    {
        for ($i = $day1; $i <= $day2; $i += 60 * 60 * 24){
            $this->initNewDauCountDay(date('Y-m-d', $i));
        }
    }

    /**
     * 新增用户与日活统计
     * @param string $day [某一天]
     */
    public function initNewDauCountDay($day)
    {
        $sys_today = date('Y-m-d',get_time());
        if(empty($day) || $day >= $sys_today || $day < '2018-08-01'){
            return;
        }

        $start_time                 = strtotime($day.' 00:00:00');     // 开始时间
        $end_time                   = $start_time + 60 * 60 * 24 - 1;       // 结束时间

        $new_dau_count_day_table    = get_db_table_name('counter_day_new_dau');     // 新增与日活数据表b_counter_day_new_dau
        $user_list_table            = get_db_table_name('1_user_list');             // 用户表b_1_user_list;
        $dau_api_table              = get_db_table_name('w_api',1,$day);            // 日活表b_w_api_m1808

        $day_where                  = null;
        $day_where[]                = ['day','=',date('Ymd',$start_time)];

        $is_have_data               = Db::table($new_dau_count_day_table)->where($day_where)->find();

        if (!$is_have_data) {// 没有结果则添加数据

            // 新增用户统计条件
            $user_where     = null;
            $user_where[]   = ['regtime','between time',[$start_time,$end_time]];

            // 日活统计条件
            $dau_where      = null;
            $dau_where[]    = ['addtime','between time',[$start_time,$end_time]];

            $new_count = Db::table($user_list_table)->where($user_where)->count('uid');             // 新增用户数据
            $dau_count = Db::table($dau_api_table)->where($dau_where)->group('uid')->count('*');    // 日活数据统计

            $add_data = null;
            $add_data['day'] = date('Ymd', $start_time);
            $add_data['count1']     = $this->returnValue($new_count);   // 新增用户
            $add_data['count2']     = $this->returnValue($dau_count);   // 日活
            $add_data['addtime']    = get_time();

            Db::table($new_dau_count_day_table)->data($add_data)->insert();
        }
    }

    /**
     * 收入支出数据统计-数据非完整数据，后期需要后台维护
     * @param string $day [某一天]
     */
    public function initIncomeOutlayCountDay($day = '')
    {
        $sys_today = date('Y-m-d',get_time());
        if(empty($day) || $day >= $sys_today || $day < '2018-10-01'){
            return;
        }

        $start_time                 = strtotime($day.' 00:00:00');                    // 开始时间
        $end_time                   = $start_time + 60 * 60 * 24 - 1;                       // 结束时间

        //支出相关表
        $income_outlay_count_day_table  = get_db_table_name('counter_day_income_outlay'); // 收入支出数据统计表b_counter_day_income_outlay
        $my_record_u_table              = get_db_table_name('w_my_record',1,$day);      // 系统红包数据表b_w_my_record_m1810_u0
        $invite_u_table                 = get_db_table_name('w_invite',1,$day);         // 邀请红包数据表b_w_invite_m1810_u0
        $my_record_table                = substr($my_record_u_table,0,21);  // 表名处理:b_w_my_record_m1810_u
        $invite_table                   = substr($invite_u_table,0,18);     // 表名处理:b_w_invite_m1810_u

        //收入相关表
        $service_charge_table           = get_db_table_name('1_ad');                    // 服务费数据表b_1_ad money * 0.25

        $day_where                  = null;
        $day_where[]                = ['day','=',date('Ymd',$start_time)];

        $is_have_data               = Db::table($income_outlay_count_day_table)->where($day_where)->find();
        if (!$is_have_data) {// 没有结果则添加数据

            // 系统红包条件
            $record_where = null;
            $record_where[] = ['addtime','between time',[$start_time,$end_time]];
            $record_where[] = ['type','=',1];

            // 邀请红包条件
            $invite_where = null;
            $invite_where[] = ['addtime','between time',[$start_time,$end_time]];
            $invite_where[] = ['isopen','=',1];     // 注册红包是否可以打开  1可以打开 0不可以打开
            $invite_where[] = ['type','=',2];       // 类型 1邀请分红奖励  2邀请注册奖励

            //服务费查询条件
            $service_charge_where = null;
            $service_charge_where[] = ['ad_type','=',2];    // 1系统红包 2非系统红包 3注册时的红包
            $service_charge_where[] = ['addtime','between time',[$start_time,$end_time]];


            $record_money = 0;  // 系统红包
            $invite_money = 0;  // 邀请红包

            for ($i = 0; $i <= 9; $i ++){
                $record_money += Db::table($my_record_table.$i)->where($record_where)->sum('money');
                $invite_money += Db::table($invite_table.$i)->where($invite_where)->sum('money');
            }

            //服务费收入数据查询
            $res = Db::table($service_charge_table)
                ->field('sum(money) as all_money,count(id) as all_persons')
                ->where($service_charge_where)
                ->select();

            $add_data = null;
            $add_data['day'] = date('Ymd', $start_time);
            $add_data['count1'] = 0;                                                                        // 趣味游戏支出
            $add_data['count2'] = 0;                                                                        // 百万红包支出
            $add_data['count3'] = $this->returnValue($record_money);                                        // 系统红包支出
            $add_data['count4'] = $this->returnValue($invite_money);                                        // 邀请红包支出
            $add_data['count5'] = format_num($this->returnValue($res[0]['all_money']) * 0.25);              // 服务费收入
            $add_data['count6'] = 0;                                                                        // 自有广告收入
            $add_data['count7'] = 0;                                                                        // 腾讯广告收入
            $add_data['count8'] = 0;                                                                        // 收支差额
            $add_data['count9'] = $this->returnValue($res[0]['all_persons']);                               // 人次
            $add_data['count_income'] = 0;                                                                  // 总收入，后期后台维护
            $add_data['count_outlay'] = $add_data['count3'] + $add_data['count4'];// 总支出 = 系统红包支出 + 邀请红包支出（列表需要加上趣味游戏、百万红包支出）
            $add_data['addtime'] = get_time();

            Db::table($income_outlay_count_day_table)->data($add_data)->insert();
        }
    }

    /**
     * 初始化某天百万红包统计数据
     * @param string $day [某一天]
     */
    public function initMillionCountDay($day = '')
    {
        $sys_today = date('Y-m-d',get_time());
        if(empty($day) || $day >= $sys_today || $day < '2018-10-01'){
            return;
        }

        $million_count_day_table = get_db_table_name('counter_day_million');  // 百万红包数据统计表b_counter_day_million
        $start_time = strtotime($day.' 00:00:00');                    // 开始时间
        $end_time = $start_time + 60 * 60 * 24 - 1;                         // 结束时间

        $day_where = null;
        $day_where[] = ['day','=',date('Ymd',$start_time)];
        $is_have_data = Db::table($million_count_day_table)->where($day_where)->find();

        if (!$is_have_data) {// 没有结果添加数据
            $time_where = null;
            $time_where[] = ['addtime','between time',[$start_time,$end_time]];
            $openRedMoney = Db::table($this->millions_count_table)->where($time_where)->sum('c_103');   // 支出金额
            $clickCount   = Db::table($this->millions_count_table)->where($time_where)->sum('c_105');   // 百万红包点击数
            $inviteSuccess= Db::table($this->millions_count_table)->where($time_where)->sum('c_104');   // 邀请成功人数
            $openRed      = Db::table($this->millions_count_table)->where($time_where)->sum('c_102');   // 拆完红包个数

            $add_data = null;
            $add_data['day'] = date('Ymd', $start_time);
            $add_data['count1'] = $this->returnValue($openRed);             // 拆完红包个数
            $add_data['count2'] = $this->returnValue($inviteSuccess);       // 邀请成功人数
            $add_data['count3'] = $this->returnValue($clickCount);          // 百万红包点击数
            $add_data['count4'] = $this->returnValue($openRedMoney) * 0.0001;  // 支出金额
            $count5 = $add_data['count2'] == 0 ? 0 : format_num($add_data['count4'] / $add_data['count2']);    // 人均拉新成本计算
            $add_data['count5'] = $count5;                                  // 人均拉新成本
            $add_data['addtime'] = get_time();

            Db::table($million_count_day_table)->data($add_data)->insert();
        }
    }

    /**
     * 变量是否为空返回对应数值
     * @param $value [需要判断的变量值]
     * @return int [返回原变量值或0]
     */
    protected function returnValue($value)
    {
        return !empty($value) ? $value : 0;
    }

    /**
     * 初始化某天统计数据
     * @param string $day [某一天]
     */
    public function initGameCountDay($day = '')
    {
        $sys_today = date('Y-m-d',get_time());
        if(empty($day) || $day >= $sys_today || $day < '2018-10-01'){
            return;
        }

        $game_count_day_table = get_db_table_name('counter_day_game');    // 游戏数据统计表b_counter_day_game
        $start_time = strtotime($day.' 00:00:00');                // 开始时间
        $end_time = $start_time + 60 * 60 * 24 - 1;                     // 结束时间

        $day_where = null;
        $day_where[] = ['day','=',date('Ymd',$start_time)];
        $is_have_data = Db::table($game_count_day_table)->where($day_where)->find();
        if (!$is_have_data) {// 没有结果添加数据
            //红包未领取sql
            $noReceivedSql = "SELECT sum(a.b) as all_num FROM (
SELECT sum(red_money) as b,uid FROM `b_game_redpacket_u0` where red_status = 1 and addtime between $start_time and $end_time group by uid
union all
SELECT sum(red_money) as b,uid FROM `b_game_redpacket_u1` where red_status = 1 and addtime between $start_time and $end_time group by uid
union all
SELECT sum(red_money) as b,uid FROM `b_game_redpacket_u2` where red_status = 1 and addtime between $start_time and $end_time group by uid
union all
SELECT sum(red_money) as b,uid FROM `b_game_redpacket_u3` where red_status = 1 and addtime between $start_time and $end_time group by uid
union all
SELECT sum(red_money) as b,uid FROM `b_game_redpacket_u4` where red_status = 1 and addtime between $start_time and $end_time group by uid
union all
SELECT sum(red_money) as b,uid FROM `b_game_redpacket_u5` where red_status = 1 and addtime between $start_time and $end_time group by uid
union all
SELECT sum(red_money) as b,uid FROM `b_game_redpacket_u6` where red_status = 1 and addtime between $start_time and $end_time group by uid
union all
SELECT sum(red_money) as b,uid FROM `b_game_redpacket_u7` where red_status = 1 and addtime between $start_time and $end_time group by uid
union all
SELECT sum(red_money) as b,uid FROM `b_game_redpacket_u8` where red_status = 1 and addtime between $start_time and $end_time group by uid
union all
SELECT sum(red_money) as b,uid FROM `b_game_redpacket_u9` where red_status = 1 and addtime between $start_time and $end_time group by uid
) as a";
            //红包已领取sql
            $receivedSql = "SELECT sum(a.b) as all_num FROM (
SELECT sum(red_money) as b,uid FROM `b_game_redpacket_u0` where red_status = 2 and addtime between $start_time and $end_time group by uid
union all
SELECT sum(red_money) as b,uid FROM `b_game_redpacket_u1` where red_status = 2 and addtime between $start_time and $end_time group by uid
union all
SELECT sum(red_money) as b,uid FROM `b_game_redpacket_u2` where red_status = 2 and addtime between $start_time and $end_time group by uid
union all
SELECT sum(red_money) as b,uid FROM `b_game_redpacket_u3` where red_status = 2 and addtime between $start_time and $end_time group by uid
union all
SELECT sum(red_money) as b,uid FROM `b_game_redpacket_u4` where red_status = 2 and addtime between $start_time and $end_time group by uid
union all
SELECT sum(red_money) as b,uid FROM `b_game_redpacket_u5` where red_status = 2 and addtime between $start_time and $end_time group by uid
union all
SELECT sum(red_money) as b,uid FROM `b_game_redpacket_u6` where red_status = 2 and addtime between $start_time and $end_time group by uid
union all
SELECT sum(red_money) as b,uid FROM `b_game_redpacket_u7` where red_status = 2 and addtime between $start_time and $end_time group by uid
union all
SELECT sum(red_money) as b,uid FROM `b_game_redpacket_u8` where red_status = 2 and addtime between $start_time and $end_time group by uid
union all
SELECT sum(red_money) as b,uid FROM `b_game_redpacket_u9` where red_status = 2 and addtime between $start_time and $end_time group by uid
) as a";
            //总消耗sql
            /*$totalUseSql = "SELECT sum(a.b) as all_num FROM (
SELECT sum(red_money) as b,uid FROM `b_game_redpacket_u0` where addtime between $start_time and $end_time group by uid
union all
SELECT sum(red_money) as b,uid FROM `b_game_redpacket_u1` where addtime between $start_time and $end_time group by uid
union all
SELECT sum(red_money) as b,uid FROM `b_game_redpacket_u2` where addtime between $start_time and $end_time group by uid
union all
SELECT sum(red_money) as b,uid FROM `b_game_redpacket_u3` where addtime between $start_time and $end_time group by uid
union all
SELECT sum(red_money) as b,uid FROM `b_game_redpacket_u4` where addtime between $start_time and $end_time group by uid
union all
SELECT sum(red_money) as b,uid FROM `b_game_redpacket_u5` where addtime between $start_time and $end_time group by uid
union all
SELECT sum(red_money) as b,uid FROM `b_game_redpacket_u6` where addtime between $start_time and $end_time group by uid
union all
SELECT sum(red_money) as b,uid FROM `b_game_redpacket_u7` where addtime between $start_time and $end_time group by uid
union all
SELECT sum(red_money) as b,uid FROM `b_game_redpacket_u8` where addtime between $start_time and $end_time group by uid
union all
SELECT sum(red_money) as b,uid FROM `b_game_redpacket_u9` where addtime between $start_time and $end_time group by uid
) as a";*/
            //统计游戏的人数sql
            $gamePersonsSql = "SELECT count(a.b) as all_num FROM (
SELECT count(id) as b,uid FROM `b_game_prize_u0` where  addtime between $start_time and $end_time group by uid
union all
SELECT count(id) as b,uid FROM `b_game_prize_u1` where  addtime between $start_time and $end_time group by uid
union all
SELECT count(id) as b,uid FROM `b_game_prize_u2` where  addtime between $start_time and $end_time group by uid
union all
SELECT count(id) as b,uid FROM `b_game_prize_u3` where  addtime between $start_time and $end_time group by uid
union all
SELECT count(id) as b,uid FROM `b_game_prize_u4` where  addtime between $start_time and $end_time group by uid
union all
SELECT count(id) as b,uid FROM `b_game_prize_u5` where  addtime between $start_time and $end_time group by uid
union all
SELECT count(id) as b,uid FROM `b_game_prize_u6` where  addtime between $start_time and $end_time group by uid
union all
SELECT count(id) as b,uid FROM `b_game_prize_u7` where  addtime between $start_time and $end_time group by uid
union all
SELECT count(id) as b,uid FROM `b_game_prize_u8` where  addtime between $start_time and $end_time group by uid
union all
SELECT count(id) as b,uid FROM `b_game_prize_u9` where  addtime between $start_time and $end_time group by uid
) as a";

            $noReceived     = Db::query($noReceivedSql);            // 未领取红包数
            $received       = Db::query($receivedSql);              // 已领取红包数
            $gamePersons    = Db::query($gamePersonsSql);           // 统计游戏的人数
            //$count          = Db::query($totalUseSql);            // 总消耗

            // 添加数据
            $add_data = null;
            $add_data['count1']  = !empty($noReceived[0]['all_num']) ? $noReceived[0]['all_num'] : 0;   // 未领取红包数
            $add_data['count2']  = !empty($received[0]['all_num']) ? $received[0]['all_num'] : 0;       // 已领取红包数
            $add_data['count3']  = !empty($gamePersons[0]['all_num']) ? $gamePersons[0]['all_num'] : 0; // 统计游戏的人数
            $add_data['count']   = $add_data['count1'] + $add_data['count2'];    // 总消耗
            $add_data['day']     = date('Ymd', $start_time);
            $add_data['addtime'] = get_time();

            Db::table($game_count_day_table)->data($add_data)->insert();
        }
    }

    /**
     * 广告数据统计
     * @param string $day [某一天]
     */
    public function initAdvCountDay($day = '')
    {
        $sys_today = date('Y-m-d',get_time());
        if(empty($day) || $day >= $sys_today || $day < '2018-10-01'){
            return;
        }
        $start_time = strtotime($day.' 00:00:00');//开始时间
        $end_time = $start_time + 60 * 60 * 24 - 1;//结束时间

        //定义一些表
        $adv_show_table = get_db_table_name('adv_show',1,$day);
        $adv_count_day_table = get_db_table_name('counter_day_adv');
        //百万红包广告
        $old_adv_show_table = get_db_table_name('1_adv_show',1,$day);
        $old_adv_img_table = get_db_table_name('1_adv_img');

        $day_where = null;
        $day_where[] = ['day','=',date('Ymd',$start_time)];
        $is_have_data = Db::table($adv_count_day_table)->where($day_where)->find();
        if (!$is_have_data) {//没有结果

            $new_adv_list = Db::table($this->adv_list_table)->field('id,ad_title')->where('status=1')->select();
            foreach ($new_adv_list as $one) {
                //初始化统计数据
                $count1 = 0;
                $count2 = 0;
                $count3 = 0;
                //新广告统计
                //去b_adv_show_m1810取一天某广告ID的数据=count1
                $adv_config_where = null;
                $adv_config_where[] = ['ad_list_id', '=', $one['id']];
                $list_id = Db::table($this->adv_config_table)->where($adv_config_where)->field('id')->select();
                foreach ($list_id as $two) {
                    $adv_show_where = null;
                    $adv_show_where[] = ['l_gid', '=', $two['id']];
                    $adv_show_where[] = ['addtime', 'between time', [$start_time, $end_time]];
                    $count1 += Db::table($adv_show_table)->where($adv_show_where)->count();
                }

                //游戏广告统计
                //去game_prize取一天某广告ID的数据=count2
                if ($end_time < strtotime('2018-11-02 00:00:00')) {
                    $game_adv_where = null;
                    $game_adv_where[] = ['ad_title', '=', $one['ad_title']];
                    $list_id = Db::table($this->game_ad_table)->where($game_adv_where)->field('id')->select();
                } else {
                    $game_adv_where = null;
                    $game_adv_where[] = ['ad_list_id', '=', $one['id']];
                    $list_id = Db::table($this->adv_config_table)->where($game_adv_where)->field('id')->select();
                }

                foreach ($list_id as $two) {
                    $ad_id = $two['id'];
                    $adShowSql = "SELECT sum(a.cc) as all_num FROM (
            SELECT count(id) as cc,uid FROM `b_game_prize_u0` where p_type = 1 and p_id = $ad_id and addtime between $start_time and $end_time
            union all
            SELECT count(id) as cc,uid FROM `b_game_prize_u1` where p_type = 1 and p_id = $ad_id and addtime between $start_time and $end_time
            union all
            SELECT count(id) as cc,uid FROM `b_game_prize_u2` where p_type = 1 and p_id = $ad_id and addtime between $start_time and $end_time
            union all
            SELECT count(id) as cc,uid FROM `b_game_prize_u3` where p_type = 1 and p_id = $ad_id and addtime between $start_time and $end_time
            union all
            SELECT count(id) as cc,uid FROM `b_game_prize_u4` where p_type = 1 and p_id = $ad_id and addtime between $start_time and $end_time
            union all
            SELECT count(id) as cc,uid FROM `b_game_prize_u5` where p_type = 1 and p_id = $ad_id and addtime between $start_time and $end_time
            union all
            SELECT count(id) as cc,uid FROM `b_game_prize_u6` where p_type = 1 and p_id = $ad_id and addtime between $start_time and $end_time
            union all
            SELECT count(id) as cc,uid FROM `b_game_prize_u7` where p_type = 1 and p_id = $ad_id and addtime between $start_time and $end_time
            union all
            SELECT count(id) as cc,uid FROM `b_game_prize_u8` where p_type = 1 and p_id = $ad_id and addtime between $start_time and $end_time
            union all
            SELECT count(id) as cc,uid FROM `b_game_prize_u9` where p_type = 1 and p_id = $ad_id and addtime between $start_time and $end_time
            ) as a";

                    $db_ad_list = Db::query($adShowSql);
                    $count2 += $db_ad_list['0']['all_num'];
                }

                //百万红包广告
                //去b_1_adv_show_m1810取一天某广告ID的数据=count3
                $old_adv_config_where = null;
                $old_adv_config_where[] = ['ad_title', '=', $one['ad_title']];
                $list_id = Db::table($old_adv_img_table)->where($old_adv_config_where)->field('id')->select();
                foreach ($list_id as $two) {
                    $adv_show_where = null;
                    $adv_show_where[] = ['l_gid', '=', $two['id']];
                    $adv_show_where[] = ['addtime', 'between time', [$start_time, $end_time]];
                    $count3 += Db::table($old_adv_show_table)->where($adv_show_where)->count();
                }

                //查询时间条件在b_counter_day_adv中是否有记录，如果没有就添加，有就更新
                $count_day_where = null;
                $count_day_where[] = ['day', '=', date('Ymd', $start_time)];
                $count_day_where[] = ['gid', '=', $one['id']];
                $count_day_res = Db::table($adv_count_day_table)->where($count_day_where)->find();
                if ($count_day_res) {//有结果更新数据
                    $up_data['count1'] = $count1;
                    $up_data['count2'] = $count2;
                    $up_data['count3'] = $count3;
                    $up_data['count'] = $count1 + $count2 + $count3;
                    $up_where = null;
                    $up_where['id'] = $count_day_res['id'];
                    Db::table($adv_count_day_table)->where($up_where)->data($up_data)->update();
                } else {//无结果插入数据
                    $add_data['count1'] = $count1;
                    $add_data['count2'] = $count2;
                    $add_data['count3'] = $count3;
                    $add_data['count'] = $count1 + $count2 + $count3;
                    $add_data['gid'] = $one['id'];
                    $add_data['day'] = date('Ymd', $start_time);
                    $add_data['addtime'] = get_time();
                    Db::table($adv_count_day_table)->data($add_data)->insert();
                }
            }
        }
    }

    /**
     * 广告数据统计
     * @param string $start_time [开始时间]
     * @param string $end_time [结束时间]
     * @return array
     */
    public function getAdvCount($start_time = '',$end_time = '')
    {
        //每次点击统计前7天的数据
        $today_day = date('Y-m-d',get_time());
        $today = strtotime($today_day." 00:00:00");

        //7天前时间戳
        $seven_day_ago = $today - 60 * 60 * 24 * 7;
        for($i = $seven_day_ago;$i < $today;$i += 60 * 60 * 24){
            $this->initAdvCountDay(date('Y-m-d',$i));
        }
        //v2 Jason 2018-11-06
        $adv_count_day_table = get_db_table_name('counter_day_adv');
        $where[] = ['day', '>=', date('Ymd',$start_time)];
        $where[] = ['day', '<=', date('Ymd',$end_time)];
        //所有广告展示总数
        $count = Db::table($adv_count_day_table)->where($where)->sum('count');

        // v1
        /*$ad_list_show = Db::table($adv_count_day_table)
            ->alias('c')
            ->field('l.ad_title as name,sum(c.count) as count')
            ->leftJoin($this->adv_list_table.' l','c.gid = l.id')
            ->group('gid')
            ->where($where)
            ->select();*/

        // v2 Jason 2018-11-07
        $ad_list_show = Db::table($adv_count_day_table)
            ->alias('c')
            ->field('l.ad_title as name,c.day,c.count,sum(c.count) as all_count')
            ->leftJoin($this->adv_list_table.' l','c.gid = l.id')
            ->group('c.gid,c.day')
            ->order('c.day desc,c.gid asc')
            ->where($where)
            ->select();

        //按日期统计
        $day_list_show = Db::table($adv_count_day_table)
            ->field('day,sum(count) as count')
            ->group('day')
            ->order('day desc')
            ->where($where)
            ->select();

        //按广告分组统计
        $ad_all_count = Db::table($adv_count_day_table)
            ->field('sum(count) as count')
            ->group('gid')
            ->order('gid asc')
            ->where($where)
            ->select();

        //当天所有广告数据统计处理
        $temp_day_count = [];
        foreach ($day_list_show as $one){
            $temp_day_count[$one['day']] = $one['count'];
        }

        $temp_arr = [];
        $temp_ad_name = [];
        foreach ($ad_list_show as $k=>$v) {
            $temp_arr[$v['day']][$k] = $v;
            $temp_ad_name[$v['day']][] = $v['name'];
        }

        $data = [
            'ad_all_show'=>$count,                      // 条件查询后的广告总展示数
            'ad_list_show'=>$ad_list_show,
            'temp_arr' =>$temp_arr,                     // 按天分组广告数据
            'temp_ad_name' =>current($temp_ad_name),    // 广告名称
            'day_count' =>$temp_day_count,              // 按天统计所有广告
            'ad_all_count' =>$ad_all_count,              // 按天统计所有广告
        ];

        return $data;

        //统计广告曝光数
        /*if(time() < strtotime('2018-12-01')){

            //----第一部分:游戏广告----
//            $adPersonsSql = "SELECT sum(a.b) as all_num FROM (
//			SELECT count(id) as b,uid FROM `b_game_prize_u0` where p_status = 1 and addtime between $start_time and $end_time group by uid
//			union all
//			SELECT count(id) as b,uid FROM `b_game_prize_u1` where p_status = 1 and addtime between $start_time and $end_time group by uid
//			union all
//			SELECT count(id) as b,uid FROM `b_game_prize_u2` where p_status = 1 and addtime between $start_time and $end_time group by uid
//			union all
//			SELECT count(id) as b,uid FROM `b_game_prize_u3` where p_status = 1 and addtime between $start_time and $end_time group by uid
//			union all
//			SELECT count(id) as b,uid FROM `b_game_prize_u4` where p_status = 1 and addtime between $start_time and $end_time group by uid
//			union all
//			SELECT count(id) as b,uid FROM `b_game_prize_u5` where p_status = 1 and addtime between $start_time and $end_time group by uid
//			union all
//			SELECT count(id) as b,uid FROM `b_game_prize_u6` where p_status = 1 and addtime between $start_time and $end_time group by uid
//			union all
//			SELECT count(id) as b,uid FROM `b_game_prize_u7` where p_status = 1 and addtime between $start_time and $end_time group by uid
//			union all
//			SELECT count(id) as b,uid FROM `b_game_prize_u8` where p_status = 1 and addtime between $start_time and $end_time group by uid
//			union all
//			SELECT count(id) as b,uid FROM `b_game_prize_u9` where p_status = 1 and addtime between $start_time and $end_time group by uid
//			) as a";
//            //统计广告曝光数
//            $adPersons = Db::query($adPersonsSql);

            $i_game_all = 0;
            $game_ad_list = Db::table($this->game_ad_table)->field('id,ad_title')->where("ad_status = 1")->select();
            //每个广告的展现统计
            foreach ($game_ad_list as $k => $v) {
                $ad_id = $v['id'];
                $time_range = " and addtime between $start_time and $end_time";
                $time_range = " ";
                $adShowSql = "SELECT sum(a.cc) as all_num FROM (
				SELECT count(id) as cc,uid FROM `b_game_prize_u0` where p_type = 1 and p_id = $ad_id $time_range
				union all
				SELECT count(id) as cc,uid FROM `b_game_prize_u1` where p_type = 1 and p_id = $ad_id $time_range
				union all
				SELECT count(id) as cc,uid FROM `b_game_prize_u2` where p_type = 1 and p_id = $ad_id $time_range
				union all
				SELECT count(id) as cc,uid FROM `b_game_prize_u3` where p_type = 1 and p_id = $ad_id $time_range
				union all
				SELECT count(id) as cc,uid FROM `b_game_prize_u4` where p_type = 1 and p_id = $ad_id $time_range
				union all
				SELECT count(id) as cc,uid FROM `b_game_prize_u5` where p_type = 1 and p_id = $ad_id $time_range
				union all
				SELECT count(id) as cc,uid FROM `b_game_prize_u6` where p_type = 1 and p_id = $ad_id $time_range
				union all
				SELECT count(id) as cc,uid FROM `b_game_prize_u7` where p_type = 1 and p_id = $ad_id $time_range
				union all
				SELECT count(id) as cc,uid FROM `b_game_prize_u8` where p_type = 1 and p_id = $ad_id $time_range
				union all
				SELECT count(id) as cc,uid FROM `b_game_prize_u9` where p_type = 1 and p_id = $ad_id $time_range
				) as a";
                $db_ad_list = Db::query($adShowSql);
                $i_game_all = $i_game_all + $db_ad_list[0]['all_num'];
                $adShow[$v['ad_title']] = $db_ad_list[0]['all_num'];
            }

            //----第二部分:百万广告----
            $i_million_all = 0;
            $million_all_sql = "SELECT SUM(ad_count) as cc from b_1_adv_img where status = 1";
            $db_million_all = Db::query($million_all_sql);
            $i_million_all = $db_million_all[0]['cc'];

            $million_list_sql = "SELECT ad_title,SUM(ad_count) as cc from b_1_adv_img where status = 1 GROUP BY ad_title ;";
            $db_million_list = Db::query($million_list_sql);
            foreach ($db_million_list as $v){
                $adShow2[$v['ad_title']] = $v['cc'];
            }


            //----第三部分:最新广告----
            $i_new_all = 0;
            $new_all_sql = "SELECT SUM(ad_show_count) as cc from b_adv_config where status = 1";
            $db_new_all = Db::query($new_all_sql);
            $i_new_all = $db_new_all[0]['cc'];

            $new_list_sql = "SELECT ad_title,SUM(ad_show_count) as cc from b_adv_config where status = 1 GROUP BY ad_title ;";
            $db_new_list = Db::query($new_list_sql);
            foreach ($db_new_list as $v){
                $adShow3[$v['ad_title']] = $v['cc'];
            }

            //----第三部分:汇总----
            $ad_all_show = $i_game_all + $i_million_all + $i_new_all;

            foreach ( $adShow3 as $k=>$v){
                $arr = [];
                $arr['name'] = $k;
                $i1 = isset($adShow[$k]) ? $adShow[$k]: 0;
                $i2 = isset($adShow2[$k]) ? $adShow2[$k]: 0;
                $i3 = isset($adShow3[$k]) ? $adShow3[$k]: 0;
                $arr['count'] = $i1 + $i2 + $i3;
                $ad_list_show[] = $arr;
            }

        } else {
            $i_new_all = 0;
            $new_all_sql = "SELECT SUM(ad_count) as cc from b_adv_config where status = 1";
            $db_new_all = Db::query($new_all_sql);
            $i_new_all = $db_new_all[0]['cc'];

            $new_list_sql = "SELECT ad_title,SUM(ad_count) as cc from b_adv_config where status = 1 GROUP BY ad_title ;";
            $db_new_list = Db::query($new_list_sql);
            foreach ($db_new_list as $v){
                $adShow3[$v['ad_title']] = $v['cc'];
            }

            $ad_all_show = $i_new_all;
            $ad_list_show = $db_new_list;
        }
        $data = [
            'ad_all_show'=>$ad_all_show,
            'ad_list_show'=>$ad_list_show,
        ];
        return $data;*/
    }

    /**
     * 游戏数据统计
     * @param string $start_time [开始时间]
     * @param string $end_time [结束时间]
     * @return array
     */
    public function getGameCount($start_time = '',$end_time = '')
    {
        //每次点击统计前7天的数据
        $today_day = date('Y-m-d',get_time());
        $today = strtotime($today_day." 00:00:00");
        //7天前时间戳
        $seven_day_ago = $today - 60 * 60 * 24 * 7;
        for($i = $seven_day_ago;$i < $today;$i += 60 * 60 * 24){
            $this->initGameCountDay(date('Y-m-d',$i));
        }

        $game_count_day_table = get_db_table_name('counter_day_game');
        $where[] = ['day', '>=', date('Ymd',$start_time)];
        $where[] = ['day', '<=', date('Ymd',$end_time)];

        $no_receive = Db::table($game_count_day_table)->where($where)->sum('count1');   // 未领取金额
        $receive = Db::table($game_count_day_table)->where($where)->sum('count2');      // 已取金额
        $game_persons = Db::table($game_count_day_table)->where($where)->sum('count3'); // 游戏人数
        $total_used = Db::table($game_count_day_table)->where($where)->sum('count');    // 总支出
        // 列表数据
        $list = Db::table($game_count_day_table)
            ->field('day,count1,count2,count3,count')
            ->order('day desc')
            ->where($where)
            ->select();

        $return_data = [
            'list'=>$list,
            'no_receive'=>$no_receive,
            'receive'=>$receive,
            'game_persons'=>$game_persons,
            'total_used'=>$total_used
        ];

        return $return_data;
    }

    /**
     * 收支名字表数据统计
     * @param string $start_time [开始时间]
     * @param string $end_time [结束时间]
     * @return mixed
     */
    public function getIncomeOutlayCount($start_time = '',$end_time = '')
    {
        //每次点击统计前7天的数据
        $today_day = date('Y-m-d',get_time());
        $today = strtotime($today_day." 00:00:00");

        //7天前时间戳
        $seven_day_ago = $today - 60 * 60 * 24 * 7;
        for($i = $seven_day_ago;$i < $today;$i += 60 * 60 * 24){
            $this->initIncomeOutlayCountDay(date('Y-m-d',$i));    // 收入支出数据
        }

        $io_count_day_table         = get_db_table_name('counter_day_income_outlay'); //收入支出数据统计表b_counter_day_income_outlay
        $game_count_day_table       = get_db_table_name('counter_day_game');          // 游戏数据统计表b_counter_day_game
        $million_count_day_table    = get_db_table_name('counter_day_million');       // 百万红包数据统计表b_counter_day_million

        // 连表查询条件
        $where[] = ['i.day', '>=', date('Ymd',$start_time)];
        $where[] = ['i.day', '<=', date('Ymd',$end_time)];

        $list = Db::table($io_count_day_table)
            ->alias('i')
            ->field('i.id,i.day,i.count3,i.count4,i.count5,i.count6,i.count7,i.count8,i.count_income,i.count_outlay,g.count as game_count,m.count4 as mill_count')
            ->leftJoin($game_count_day_table.' g','i.day = g.day')
            ->leftJoin($million_count_day_table.' m','i.day = m.day')
//            ->group('i.day')
            ->order('i.day desc')
            ->where($where)
            ->select();

        // 总支出 = 趣味游戏支出 + 百万红包支出 + 系统红包支出 + 邀请红包支出
        // 总收入 = 服务费收入 + 自有广告收入 + 腾讯广告收入
        // 收支差额 = 总收入 - 总支出
        $game_all_count = 0;    // 趣味游戏总支出
        $mill_all_count = 0;    // 百万红包总支出
        $sys_all_count = 0;     // 系统红包支出
        $invite_all_count = 0;  // 邀请红包支出

        $service_all_count = 0; // 服务费收入
        $own_all_count = 0;     // 自有广告收入
        $tencent_all_count = 0; // 腾讯广告收入

        foreach ($list as $k=>$v) {
            $list[$k]['count_outlay'] = format_num($v['game_count'] + $v['mill_count'] + $v['count3'] + $v['count4']);  // 总支出
            $list[$k]['count_income'] = format_num($v['count5'] + $v['count6'] + $v['count7']);                         // 总收入
            $list[$k]['count8'] = format_num(($v['count5'] + $v['count6'] + $v['count7']) - ($v['game_count'] + $v['mill_count'] + $v['count3'] + $v['count4'])); // 收支差额
            $game_all_count += $v['game_count'];
            $mill_all_count += $v['mill_count'];
            $sys_all_count += $v['count3'];
            $invite_all_count += $v['count4'];
            $service_all_count += $v['count5'];
            $own_all_count += $v['count6'];
            $tencent_all_count += $v['count7'];
        }

        $return_data['all_data_count'] = [
            'game_all_count'    =>$game_all_count,      // 趣味游戏总支出
            'mill_all_count'    =>$mill_all_count,      // 百万红包总支出
            'sys_all_count'     =>$sys_all_count,       // 系统红包总支出
            'invite_all_count'  =>$invite_all_count,    // 邀请红包总支出
            'outlay_all_count'  =>format_num($game_all_count + $mill_all_count + $sys_all_count + $invite_all_count), // 列表数据总支出
            'service_all_count' =>$service_all_count,   // 服务费总收入
            'own_all_count'     =>$own_all_count,       // 自有广告总收入
            'tencent_all_count' =>$tencent_all_count,   // 腾讯广告总收入
            'income_all_count'  =>$service_all_count + $own_all_count + $tencent_all_count,                // 列表数据总收入
            'difference' =>format_num(($service_all_count + $own_all_count + $tencent_all_count) - ($game_all_count + $mill_all_count + $sys_all_count + $invite_all_count)),//总差额
        ];

        $return_data['list'] = $list;// 列表数据

        return $return_data;
    }

    /**
     * 新增与日活数据统计
     * @param string $start_time [开始时间]
     * @param string $end_time [结束时间]
     * @return array
     */
    public function getNewDauCount($start_time = '',$end_time = '')
    {
        //每次点击统计前7天的数据
        $today_day = date('Y-m-d',get_time());
        $today = strtotime($today_day." 00:00:00");

        //7天前时间戳
        $seven_day_ago = $today - 60 * 60 * 24 * 7;
        for($i = $seven_day_ago;$i < $today;$i += 60 * 60 * 24){
            $this->initNewDauCountDay(date('Y-m-d',$i));
        }

        $new_dau_count_day_table = get_db_table_name('counter_day_new_dau');
        $where[] = ['day', '>=', date('Ymd',$start_time)];
        $where[] = ['day', '<=', date('Ymd',$end_time)];

        $list = Db::table($new_dau_count_day_table)->where($where)->order('day desc')->select();    // 列表
        $new = Db::table($new_dau_count_day_table)->where($where)->sum('count1');                   // 新增
        $dau = Db::table($new_dau_count_day_table)->where($where)->sum('count2');                   // 日活

        $return_data['list'] = !empty($list) ? $list : [];
        $return_data['new'] = !empty($new) ? $new : 0;
        $return_data['dau'] = !empty($dau) ? $dau : 0;

        return $return_data;

    }

    /**
     * 百万红包数据统计
     * @param string $start_time [开始时间]
     * @param string $end_time [结束时间]
     * @return array
     */
    public function getMillionCount($start_time = '',$end_time = '')
    {
        //每次点击统计前7天的数据
        $today_day = date('Y-m-d',get_time());
        $today = strtotime($today_day." 00:00:00");

        //7天前时间戳
        $seven_day_ago = $today - 60 * 60 * 24 * 7;
        for($i = $seven_day_ago;$i < $today;$i += 60 * 60 * 24){
            $this->initMillionCountDay(date('Y-m-d',$i));
        }

        $million_count_day_table = get_db_table_name('counter_day_million');
        $where[] = ['day', '>=', date('Ymd',$start_time)];
        $where[] = ['day', '<=', date('Ymd',$end_time)];

        //$open_red       = Db::table($million_count_day_table)->where($where)->sum('count1');    // 拆完红包个数
        //$invite_success = Db::table($million_count_day_table)->where($where)->sum('count2');    // 邀请成功人数
        //$click_count    = Db::table($million_count_day_table)->where($where)->sum('count3');    // 百万红包点击数
        //$open_red_money = Db::table($million_count_day_table)->where($where)->sum('count4');    // 支出金额
        //$invite_cost    = Db::table($million_count_day_table)->where($where)->sum('count5');    // 人均拉新成本

        $data_all_count = Db::table($million_count_day_table)
            ->field('sum(count1) as open_red,sum(count2) as invite_success,sum(count3) as click_count,sum(count4) as open_red_money')
            ->where($where)
            ->select();

        // 列表数据
        $list = Db::table($million_count_day_table)
            ->field('day,count1,count2,count3,count4,count5')
            ->order('day desc')
            ->where($where)
            ->select();

        if ($data_all_count[0]['open_red_money'] == 0 || $data_all_count[0]['invite_success'] == 0) {
            $invite_cost = 0;
        } else {
            $invite_cost = format_num($data_all_count[0]['open_red_money']/$data_all_count[0]['invite_success']);
        }

        $return_data = [
            'list'              =>$list,
            'open_red'          =>!empty($data_all_count[0]['open_red']) ? $data_all_count[0]['open_red'] : 0,
            'invite_success'    =>!empty($data_all_count[0]['invite_success']) ? $data_all_count[0]['invite_success'] : 0,
            'click_count'       =>!empty($data_all_count[0]['click_count']) ? $data_all_count[0]['click_count'] : 0,
            'open_red_money'    =>!empty($data_all_count[0]['open_red_money']) ? $data_all_count[0]['open_red_money'] : 0,
            'invite_cost'       =>$invite_cost
        ];

        return $return_data;
    }

    /**
     * 更新收支明细表-自有广告收入或腾讯广告收入数据
     * @param $id [明细id]
     * @param $data [需要更新的数据]
     * @return int|string
     */
    public function upIoData($id,$data)
    {
        $io_count_day_table = get_db_table_name('counter_day_income_outlay');
        $where['id'] = $id;
        return Db::table($io_count_day_table)->where($where)->data($data)->update();
    }

    /**
     * 月度地区接口访问量
     * @param string $month
     * @return array|false|\PDOStatement|string|\think\Collection
     */
    public function getMonthlyArea($month = '')
    {
        $count_api_province_table = get_db_table_name('counter_month_api_province');  // 省份访问统计表b_counter_month_api_province
        $province_list_table = get_db_table_name('w_province_list');            // 省份数据表b_w_province_list

        $where[] = ['a.month','=',$month];
        $list = Db::table($count_api_province_table)
            ->alias('a')
            ->field('a.month,a.count,p.p_name')
            ->leftJoin($province_list_table.' p','a.province = p.p_code')
            ->where($where)
            ->select();
        return $list;
    }

    public function getMonthlyApi($month = '')
    {
        $count_api_action_table = get_db_table_name('counter_month_api_action');  // API访问统计表b_counter_month_api_action
        $api_arr = get_global_data('api_list');

        // 接口数据处理
        $new_arr = [];
        foreach ($api_arr as $one) {
            $new_arr[$one['index']] = $one['action'];
        }

        $where[] = ['month','=',$month];

        $list = Db::table($count_api_action_table)
            ->where($where)
            ->select();

        // 列表数据处理
        foreach ($list as $k=>$v) {
            if (!empty($v['action'])) {
                $list[$k]['action_name'] = $new_arr[$v['action']];
            } else {
                $list[$k]['action_name'] = 'none';
            }
        }

        return $list;
    }
}