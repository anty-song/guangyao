<?php
/**
 * 脑洞答题馆Model
 * User: zhushengli
 * Date: 18/9/18
 * Time: 下午3:51
 */
namespace app\admin\model;

use think\Db;

class QuestionModel extends BaseModel
{
    protected $question_table = 'b_question_list';
    protected $question_reward_table = 'b_question_reward';
    protected function initialize()
    {
        parent::initialize();
    }

    /**
     * 获取一条题目信息
     * @param int $id
     * @return array|false|null|\PDOStatement|string|\think\Model
     */
    public function getOneInfo($id)
    {
        $where['question_id'] = $id;
        return Db::table($this->question_table)->where($where)->find();
    }

    public function getRewardOneInfo($id)
    {
        $where['reward_id'] = $id;
        return Db::table($this->question_reward_table)->where($where)->find();
    }

    /**
     * 根据条件查询列表分页数据
     * @param int $status [题目状态,默认为启用和暂停]
     * @param int $pageSize [每页显示条数]
     * @return array [返回的列表数据]
     */
    public function getListByPage($status = 0,$pageSize = 15)
    {
        $list = Db::table($this->question_table)->paginate($pageSize);
        $page = $list->render();
        $page = !empty($page) ? $page : '';
        $data['list'] = $list->items();
        $data['page'] = $page;
        return $data;
    }

    public function getRewardListByPage($status = 0,$pageSize = 15)
    {
        $list = Db::table($this->question_reward_table)->paginate($pageSize);
        $page = $list->render();
        $page = !empty($page) ? $page : '';
        $data['list'] = $list->items();
        $data['page'] = $page;
        return $data;
    }

    /**
     * 新增题目数据
     * @param array $data [题目数据]
     * @return int|string
     */
    public function add($data)
    {
        return Db::table($this->question_table)->insert($data,true);
    }

    public function addReward($data)
    {
        return Db::table($this->question_reward_table)->insert($data,true);
    }

    /**
     * 修改对应题目数据
     * @param int $id [题目id]
     * @param array $data [需要修改的数据]
     * @return int|string
     */
    public function edit($id,$data)
    {
        $where['question_id'] = $id;
        return Db::table($this->question_table)->where($where)->data($data)->update();
    }

    public function editReward($id,$data)
    {
        $where['reward_id'] = $id;
        return Db::table($this->question_reward_table)->where($where)->data($data)->update();
    }

    /**
     * 删除题目数据
     * @param int $id [题目id]
     * @return int
     */
    public function del($id)
    {
        $where['question_id'] = $id;
        return Db::table($this->question_table)->where($where)->delete();
    }

    public function delReward($id)
    {
        $where['reward_id'] = $id;
        return Db::table($this->question_reward_table)->where($where)->delete();
    }

}