<?php

/**
 * @Author: "Hulkzero"
 * @Date:   2018-09-18 14:11:23
 * @Email: "hulkzero@163.com"
 * @Last Modified time: 2018-09-18 19:51:50
 */
namespace app\api\controller\game;

use app\api\controller\BaseController;
use app\api\model\game\MGameTest;

class GameTest extends BaseController
{	
	protected $m_MGameTest;	

	public function __construct()
    {
        parent::__construct();

        $this->m_MGameTest = new MGameTest();
    }

	public function index()
	{
		// 根据用户ID和游戏类型去数据表进行奖品信息的查询,初始为1页,每页显示15条
		$uid = 1;
		$g_id = 1;

		$t_tablename = get_db_table_name('game_prize', $uid); //获取分表表名
  		$this->m_MGameTest->setTableName($t_tablename);        //设置表名
		$test_data = $this->m_MGameTest->getMyTestList($uid, $g_id);
		var_dump(json_encode($test_data));
		echo "<br>";
		// 重新拼接数据
		$arr_data = [];
		foreach($test_data as $v){
		    $new_v['prize_id'] 		= $v['p_id'];					//奖品id
		    $new_v['prize_title'] 	= $v['p_title'];				//奖品标题
		    $new_v['prize_img'] 	= $v['p_img'];					//奖品图片
		    $new_v['prize_url'] 	= $v['p_url'];					//奖品链接地址
		    $new_v['prize_explain'] = $v['p_valid_time'];			//有效时间

			$arr_data[] = $new_v;
		}
		var_dump(json_encode($arr_data));
		return '0000';
	}
}
