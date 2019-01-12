<?php

/**
 * @Author: "Hulkzero"
 * @Date:   2018-09-12 11:30:27
 * @Email: "hulkzero@163.com"
 * @Last Modified time: 2018-09-15 18:42:40
 */

namespace app\h5\model\question;

use app\api\model\BaseModel;
use think\Db;

class QuestionModel extends BaseModel
{	
    protected $question_count_table = 'b_question_count';
    protected $question_reward_table = 'b_question_reward';
    protected $question_reward_data_table = 'b_question_reward_data';
    protected function initialize()
    {
        parent::initialize();
    }

    /**
     * 获取ip记录
     * @Author   Hulkzero
     * @DateTime 2018-09-12T11:34:03+0800
     * @Email    hulkzero@163.com
     * @param    array                    $where [description]
     * @return   [type]                          [description]
     */
    public function getipStatus($where = array())
    {   
        return Db::table($this->question_count_table)->where($where)->count(); 
    }

    /**
     * 增加记录
     */
    public function addIp($data)
    {   
        return Db::table($this->question_count_table)->insert($data,true);
    }

    /**
     * 增加记录
     */
    public function addRewardData($reward_id,$where,$createtime = '')
    {   
        $info = Db::table($this->question_reward_data_table)->where($where)->count();
        if(!$info){
            if($createtime='')$createtime=time();
            $where['createtime'] = $createtime;
            $info = Db::table($this->question_reward_data_table)->insert($where,true);
            if($info){
                if($where['type']==1){
                    $field = 'generate_num'; //生成
                }else{
                    $field = 'identify_num';
                }
                // 总生成人数+1
                return Db::table($this->question_reward_table)->where("reward_id=".$reward_id)->setInc($field);
            }
        } 
        
    }

    /**
     * 神秘装备ids
     */
    public function getRewardList($where=array())
    {
        return Db::table($this->question_reward_table)->field('reward_id,pic_url')->where($where)->select();
    }

    
}
