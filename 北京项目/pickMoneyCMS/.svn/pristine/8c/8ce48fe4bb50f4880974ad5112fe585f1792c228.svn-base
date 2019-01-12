<?php

/**
 * @Author: "Hulkzero"
 * @Date:   2018-09-08 11:06:48
 * @Email: "hulkzero@163.com"
 * @Last Modified time: 2018-09-28 10:43:21
 */

namespace app\api\controller\game;

use app\api\controller\game\GameLobby;

class Tongs extends GameLobby
{
	/**
	 * Web开始抓手,次数-1
	 * @Author   Hulkzero
	 * @DateTime 2018-09-10T18:23:38+0800
	 * @Email    hulkzero@163.com
	 * @return   [type]                   [description]
	 */
	public function start_tongs()
	{	
		$request_param 	= $this->request_param;														//获取paramData中的值
        $uid 			= $this->uid;																//获取用户id
        $g_id		= 3;																			//定义游戏类型 3
		$arr_data = $this->judge_game_num_detail($uid, $g_id, 1, 1);
		// $entry_game_popout = $this->entry_game_popout();											// 定义进入页面弹出框
		// $popout_arr_data = [																		//组合redis的值
		// 				'entry_game_popout' =>  $entry_game_popout,
		// 			];
		// $arr_data = array_merge($arr_data,$popout_arr_data);
		web_return($this->auth, $arr_data, 1, '获取成功');	
	}

	/**
	 * 根据抓到的礼包类型，来获取结果
	 * @Author   Hulkzero
	 * @DateTime 2018-09-15T15:31:13+0800
	 * @Email    hulkzero@163.com
	 * @return   [type]                   [description]
	 */
	public function get_tongs_result()
	{
		$request_param	  = $this->request_param;													//获取paramData中的值
        $uid 			  = $this->uid;																//获取用户id
         //抓到的奖品类型
        $hold_prize_type  = isset($request_param['hold_prize_type']) ? intval($request_param['hold_prize_type']): 0;
        $g_id		= 3;																			//定义游戏类型 2
		// 传递游戏的类别，根据用户名和类别在缓存中进行查找
		// 先判断缓存中可以用来抽奖的次数
		$redis = get_memcache();
		$now_time = get_time();																		//定义当前时间
		$redis_day = date('Y_m_d', $now_time);
		$redis_game_arr =  'redis_game_num_'.$redis_day.'_'.$uid.'_'.$g_id;							//定义缓存名称

		// 已经存在，判断次数，为0时表示次数用完
		$get_redis_arr = $redis->get($redis_game_arr);
		if ($get_redis_arr['num'] > 0) {															//为0时，不能进行游戏
			$entry_game_popout = $this->entry_game_popout();										// 定义进入页面弹出框
			$arr_data = [																			//组合redis的值
							'entry_game_popout' =>  $entry_game_popout,
						];
			web_return($this->auth, $arr_data, 1, '获取成功');
		} else {
			web_return($this->auth, '', 0, '次数不足');
		}
	}

	function index()
	{
		return '000';
	}
	
}
