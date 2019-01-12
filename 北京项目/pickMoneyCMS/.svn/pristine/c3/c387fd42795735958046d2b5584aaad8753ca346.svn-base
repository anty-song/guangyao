<?php
// +----------------------------------------------------------------------
// | 测试演示用RedPacket
// +----------------------------------------------------------------------
// | Author: seaboyer <seaboyer@163.com>
// | Date: 2018-09-06
// +----------------------------------------------------------------------

namespace app\api\controller;

use app\api\controller\BaseController;

use app\api\model\game\GameRedpacket;

class RedPacket extends BaseController
{
    protected $m_GameRedpacket;						//游戏中我的红包

	public function __construct()
    {
		parent::__construct();

        $this->m_GameRedpacket = new GameRedpacket();				//实例化 我的红包 模型

	}

    /**
     * 领取游戏红包(做了4件事：插入my_ad记录、修改my_ad_count记录值;插入my_record记录、修改my_record_count记录值;修改user_list的stock、recived_ad字段;修改系统的num、price的值)
     * @param $uid
     * @param $config_type
     * @param $config_id    //如果新增了这个x，对应的ad record表需要增加字段，规则 count_tx
     * @param $money         [领取到的红包金额]
     * @param $to_uid
     * @return bool
     */
    public function getUserStockPrice($uid, $config_type, $config_id, $money, $to_uid = 0)
    {
        $expire_time = get_global_data('expire_time');
        $now_time = get_time();
        $memcache = get_memcache();

        // ①①①先获取当前股数和股价，没有的就数据表读取放入
        $price_num_str = 'stock_price_num';													//当前股数和股价单位命名
        $price_num_now = $memcache->get($price_num_str);							        //当前股数和股价
        if (!$price_num_now) {																//不存在，则将表中股数和股价放入缓存
            $this->m_GameRedpacket->setTableName('b_1_stock');
            $stock_where = ['id'=>1];
            $stock_now = $this->m_GameRedpacket->getInfo($stock_where);

            $price_num_now['price'] = $stock_now['price'];
            $price_num_now['num'] = $stock_now['num'];
            $memcache->set($price_num_str, $price_num_now, false, $expire_time['h1']);//设置缓存
        }
        $price_now = $price_num_now['price'];												//当前总股数
        $num_now = $price_num_now['num'];

        // ②②②计算总股数,并重新更新当前股价和股数
        $arr = red_packet_share($money, $num_now, $price_now, $to_uid);
        $price_dif = $arr['price'] - $price_num_now['price'];//股价的差值
        if ($price_dif < 0) {
            $price_dif = 0;
        }
        $num_dif = $arr['num_a'];//股数增加数量
        if ($num_dif < 0) {
            $num_dif = 0;
        }

        // 开启事务
        $this->m_GameRedpacket->setAffair();

        $fix_total = format_num($arr['price'] * $arr['num']);
        $this->m_GameRedpacket->setTableName('b_1_stock');
        $update_param = ['total' => $fix_total];
        $res1 = $this->m_GameRedpacket->updateRedInfo(1, $update_param, $num_dif, $price_dif);

        // ③③③先查询最后一条数据price是否与当前数据一样，如果相同的话就可以不再进行插入操作了
        $this->m_GameRedpacket->setTableName('b_1_stock_price');
        $mem_last_stock = $memcache->get('last_stock');
        if (!empty($mem_last_stock)) {
            $one_last_stock_price = $mem_last_stock;
        } else {
            $one_last_stock_price = $this->m_GameRedpacket->getInfoPro([], ['price','num'], ['id'=>'desc']);
            $memcache->set('last_stock', $one_last_stock_price, false, $expire_time['h1']);
        }
        $new_stock_diff = null;
        if (!empty($one_last_stock_price)) {
            $new_price = format_price($arr['price']);
            if($one_last_stock_price['price'] != $new_price){
                $this->m_GameRedpacket->setTableName('b_1_stock_price');
                $add_stock_price_arr = [
                    'price'		=>	$new_price,
                    'num'		=>	$arr['num'],
                    'addtime'	=>	get_time(),
                ];
                $res2 = $this->m_GameRedpacket->insertInfo($add_stock_price_arr);
                $new_stock = array('price'=>$arr['price'],'num'=>$arr['num']);
                $new_stock_diff = null;
                $new_stock_diff['p'] =  $arr['price'] - $one_last_stock_price['price'];
                $new_stock_diff['n'] =  $arr['num'] - $one_last_stock_price['num'];
                $memcache->set('last_stock', $new_stock, false, $expire_time['h1']);//此处增加
            } else {
                $res2 = true;
            }
        }

        // ④④④更新A用户相关信息
        $this->m_GameRedpacket->setTableName('b_1_user_list');
        $user_list_param = ['edittime' => $now_time];
        //影响用户b_1_user_list表中的stock和receive_ad字段
        $res3 = $this->m_GameRedpacket->updateUserListInfo($uid, $user_list_param, $arr['money_a'], $arr['num_a']);

        //更新缓存中的用户信息
        $this->m_GameRedpacket->setTableName('b_1_user_list');
        $user_list_where = ['uid' => $uid];
        $user_data_stock = $this->m_GameRedpacket->getInfo($user_list_where);

        $up_user_data = ['stock' => $user_data_stock['stock']];
        $this->updateUserData($uid, $up_user_data);

        // ⑤⑤⑤ 插入my_ad分表
        $table_my_ad = get_db_table_name('w_my_ad', $uid); 					//获取w_my_ad分表表名
        $this->m_GameRedpacket->setTableName($table_my_ad);
        $w_my_ad_arr = [
            'uid'		=>	$uid,
            'money'		=>	$arr['money_a'],
            'num'		=>	format_num($arr['num_a']),
            'from_uid'	=>	$config_type,
            'ad_id'		=>	$config_id,
            'ad_type'	=>	$config_type,
            'type'		=>	$config_type,
            'addtime'	=>	get_time()
        ];
        $res7 = $this->m_GameRedpacket->insertInfo($w_my_ad_arr);

        // 查询my_ad_count统计表是否有数据
        $table_my_ad_count = get_db_table_name('w_my_ad_count');
        $opt_month = date('Ym', $now_time);
        $this->m_GameRedpacket->setTableName($table_my_ad_count);
        $where = null;
        $where['uid'] = $uid;
        $where['month'] = $opt_month;
        $one_my_ad_count = $this->m_GameRedpacket->getInfo($where);
        $field = "t".$config_type;
        if (count($one_my_ad_count) > 0) {
            //存在数据，更新数据
            $old_id = $one_my_ad_count['id'];
            $arr_data = null;
            $arr_data["num_{$field}"] = format_num($one_my_ad_count["num_{$field}"] + $arr['num_a']);
            $arr_data["money_{$field}"] = $one_my_ad_count["money_{$field}"] + $arr['money_a'];
            $arr_data["count_{$field}"] = $one_my_ad_count["count_{$field}"] + 1;
            $res8 = $this->m_GameRedpacket->updateInfo($old_id,$arr_data);
        } else {
            //不存在，插入一条数据
            $arr_data = null;
            $arr_data["uid"] = $uid;
            $arr_data["month"] = $opt_month;
            $arr_data["num_{$field}"] = format_num($arr['num_a']);
            $arr_data["money_{$field}"] = $arr['money_a'];
            $arr_data["count_{$field}"] = 1;
            $res8 = $this->m_GameRedpacket->insertInfo($arr_data);
        }

        // ⑥⑥⑥ 插入my_record分表
        $table_my_record = get_db_table_name('w_my_record', $uid); 				//获取my_record分表表名
        $this->m_GameRedpacket->setTableName($table_my_record);
        $w_my_record_arr = [
            'uid'		=>	$uid,
            'from_uid'	=>	$config_type,
            'money'		=>	$arr['money_a'],
            'num'		=>	format_num($arr['num_a']),
            'type'		=>	$config_type,
            'addtime'	=>	get_time()
        ];
        $res11 = $this->m_GameRedpacket->insertInfo($w_my_record_arr);

        // 查询my_record_count统计表是否有数据
        $table_my_record_count = get_db_table_name('w_my_record_count');
        $this->m_GameRedpacket->setTableName($table_my_record_count);
        $where = null;
        $where['uid'] = $uid;
        $where['month'] = $opt_month;
        $one_my_record_count = $this->m_GameRedpacket->getInfo($where);
        if (count($one_my_record_count) > 0) {
            //存在数据，更新数据
            $old_id = $one_my_record_count['id'];
            $arr_data = null;
            $arr_data["num_{$field}"] = format_num($one_my_record_count["num_{$field}"] + $arr['num_a']);
            $arr_data["money_{$field}"] = $one_my_record_count["money_{$field}"] + $arr['money_a'];
            $arr_data["count_{$field}"] = $one_my_record_count["count_{$field}"] + 1;
            $res12 = $this->m_GameRedpacket->updateInfo($old_id,$arr_data);
        } else {
            //不存在，插入一条数据
            $arr_data = null;
            $arr_data["uid"] = $uid;
            $arr_data["month"] = $opt_month;
            $arr_data["num_{$field}"] = format_num($arr['num_a']);
            $arr_data["money_{$field}"] = $arr['money_a'];
            $arr_data["count_{$field}"] = 1;
            $res12 = $this->m_GameRedpacket->insertInfo($arr_data);
        }

        // ⑦⑦⑦ 执行事务
        if ($res1 && $res2 && $res3 && $res7 && $res8 && $res11 && $res12) {
            $this->m_GameRedpacket->commitAffair();				//开启事务后，事务提交

            $price_num_now = $memcache->get($price_num_str);
            $price_num_now['price'] = $price_num_now['price'] + $price_dif;
            $price_num_now['num'] = $price_num_now['num'] + $num_dif;
            $memcache->set($price_num_str, $price_num_now, false, $expire_time['d7']);//事务成功,更新当前缓存

            return $arr;
        } else {//事务回滚
            $this->m_GameRedpacket->rollbackAffair();			//开启事务后，事务回退

            if(!empty($new_stock_diff)) {
                $mem_last_stock = $memcache->get('last_stock');
                $new_stock = null;
                $new_stock['price'] = $mem_last_stock['price'] - $new_stock_diff['p'];
                $new_stock['num'] = $mem_last_stock['num'] - $new_stock_diff['n'];
                $memcache->set('last_stock', $new_stock, false, $expire_time['h1']);//此功能移动到事务提交哪里
            }
            return false;
        }

    }

}
