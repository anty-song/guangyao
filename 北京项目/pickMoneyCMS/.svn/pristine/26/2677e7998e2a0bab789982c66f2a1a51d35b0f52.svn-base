<?php

/**
 * @Author: "Hulkzero"
 * @Date:   2018-09-07 15:59:20
 * @Email: "hulkzero@163.com"
 * @Last Modified time: 2018-10-31 22:47:54
 * @explain 趣味彩票游戏接口
 */

namespace app\api\controller\game;

use app\api\controller\game\GameLobby;

class Lottery extends GameLobby
{
	/**
	 * Web开始刮奖,只返出图片和结果，进行次数判断，但是不进行-1操作
	 * @Author   Hulkzero
	 * @DateTime 2018-09-10T18:23:38+0800
	 * @Email    hulkzero@163.com
	 * @return   [type]                   [description]
	 */
	public function start_lottery()
	{	
		// 不管是否中奖，参与次数-1，直到0
		$request_param 	= $this->request_param;														//获取paramData中的值
        $uid 			= $this->uid;																//获取用户id
        $g_id		= 2;																			//定义游戏类型 2
		$arr_data = $this->judge_game_num_detail($uid, $g_id, 1, 0, 4);
		// $arr_data = $this->judge_game_num_detail($uid, $g_id, 1, 0, 1);//2018.10.31晚21:58修改，领取状态
		web_return($this->auth, $arr_data, 1, '获取成功');
	}

	/**
	 * Web开始刮奖，计算次数
	 * @Author   Hulkzero
	 * @DateTime 2018-09-17T11:47:05+0800
	 * @Email    hulkzero@163.com
	 * @return   [type]                   [description]
	 */
	public function get_lottery_result()
	{
		// 不管是否中奖，参与次数-1，直到0
		$request_param 	= $this->request_param;														//获取paramData中的值
        $uid 			= $this->uid;																//获取用户id
        $g_id			= 2;																		//定义游戏类型 2
        $p_id   = isset($request_param['p_id']) 	? intval($request_param['p_id'])		: 0;
        $p_ad_id   = isset($request_param['p_ad_id']) 	? intval($request_param['p_ad_id'])		: 0;
		$arr_data = $this->judge_game_num_detail($uid, $g_id, 2, 1);

		//修改奖品状态
        // 根据奖品id，获取详细信息
        if (!empty($p_id)) {
			$res = $this->update_lottery_status($uid, $p_id);
        }
        if (!empty($p_ad_id)) {
			$res1 = $this->update_lottery_status($uid, $p_ad_id);
        }


		web_return($this->auth, $arr_data, 1, '获取成功');
	}

	public function update_lottery_status($uid, $p_id)
	{
		$t_tablename = get_db_table_name('game_prize', $uid); 											//获取分表表名
  		$prize_info = $this->m_GamePrize->getPrizeInform($t_tablename, $p_id);
  		if ($prize_info['p_type'] == 2) {																//红包
  			$red_tablename = get_db_table_name('game_redpacket', $uid); 								//获取分表表名
  			$prize_redpacket_info = $this->m_GamePrize->getPrizeInform($red_tablename, $prize_info['p_id']);
				
  			// 把股数存储到数据表
  			$update_where = [
  								'id' => $prize_redpacket_info['id'],
  							];
  			$update_param = [
  								'red_status' 	=>	1												//1未领取，2领取，3过期
  							];
  			$this->m_GamePrize->updateMyPrize($red_tablename, $update_where, $update_param);
			// 更新game_prize中的状态
			$game_prize_where = [
  									'id' => $p_id,
  								];
  			$game_prize_param = [
  									'p_status' 	=>	1,												//1未领取，2领取，3过期
  								];					
  			$this->m_GamePrize->updateMyPrize($t_tablename, $game_prize_where, $game_prize_param);
  			return true;
  		} elseif ($prize_info['p_type'] == 1) {
			$game_prize_where = [
  									'id' => $p_id,
  								];
  			$game_prize_param = [
  									'p_status' 	=>	1,												//1未领取，2领取，3过期
  								];					
  			$this->m_GamePrize->updateMyPrize($t_tablename, $game_prize_where, $game_prize_param);
  			return true;
  		} else {
  			return false;
  		}
	}

	function index()
	{
		return '000';
	}
	
}
