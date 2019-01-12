<?php

/**
 * @Author: "Hulkzero"
 * @Date:   2018-09-08 11:07:07
 * @Email: "hulkzero@163.com"
 * @Last Modified time: 2018-09-27 22:10:05
 */

namespace app\api\controller\game;

use app\api\controller\game\GameLobby;

class WaterFlower extends GameLobby
{
	/**
	 * Web进行浇花
	 * @Author   Hulkzero
	 * @DateTime 2018-09-10T18:23:38+0800
	 * @Email    hulkzero@163.com
	 * @return   [type]                   [description]
	 */
	public function start_water_flower()
	{	
		// 不管是否中奖，参与次数-1，直到0
		$request_param 	= $this->request_param;														//获取paramData中的值
        $uid 			= $this->uid;																//获取用户id
        $g_id		= 4;																			//定义游戏类型 4
		$arr_data = $this->judge_game_num_detail($uid, $g_id, 1, 1);
		web_return($this->auth, $arr_data, 1, '获取成功');
	}

	function index()
	{
		return '000';
	}
	
}
