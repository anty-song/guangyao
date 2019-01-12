<?php

/**
 * @Author   Hulkzero
 * @DateTime 2018-08-31T13:34:00+0800
 * @Email    hulkzero@163.com
 * @Explain  来捡钱答题游戏
 */
 
namespace app\h5\controller\game;

use think\Request;

class Answer extends GameLobby
{
    /**
     * 答题游戏接口
     *
     * @return \think\Response
     */
    public function home()
    {
        //模板变量赋值
        $this->assign('title','欢乐答题');
        // 游戏奖品列表数据
        $prize_data = $this->get_prize_list(1);
        // 渲染模板
        $this->assign('prize_data',$prize_data);
        //模板输出
        return $this->fetch('game/Answer/home');
    }

    /**
     * 结果页面
     * @Author   Hulkzero
     * @DateTime 2018-09-13T19:49:01+0800
     * @Email    hulkzero@163.com
     * @return   [type]                   [description]
     */
    public function answer_result()
    {
        //模板变量赋值
        $this->assign('title','趣味游戏');
        //模板输出
        return $this->fetch('game/Answer/answer_result');
    }
    
}
