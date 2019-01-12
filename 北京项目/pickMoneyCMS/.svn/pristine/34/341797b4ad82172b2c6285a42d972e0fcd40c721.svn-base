<?php
/**
 * 游戏列表model
 * Author: Jason
 * Date: 18/10/25
 * Time: 上午11:08
 */
namespace app\api\model\game;

use app\api\model\CommonModel;

use think\Db;

class GameList extends CommonModel
{
    protected $table;
    protected function initialize()
    {
        parent::initialize();
        $this->table = get_db_table_name('game_list'); // 表b_game_list
    }

    /**
     * 获取所有自有游戏配置（again_count：继续玩游戏次数；once_count：游戏可玩次数）
     * @return array|false|\PDOStatement|string|\think\Collection
     */
    public function getGameConfig()
    {
        return Db::table($this->table)->field('id,again_count,once_count')->select();
    }

    /**
     * 通过指定游戏ID返回广告、红包弹窗占比
     * @param $game_id
     * @return array|false|\PDOStatement|string|\think\Collection
     */
    public function getGameAdPrizeRadio($game_id)
    {
        // 对应游戏广告、广告+红包弹窗占比配置表b_game_ad_prize_list
        return Db::table($this->table)->where('id','=',$game_id)->field('type1_radio,type2_radio')->find();
    }
}