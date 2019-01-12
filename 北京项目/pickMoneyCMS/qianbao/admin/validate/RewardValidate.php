<?php
/**
 * 脑洞答题验证器
 * User: zhushengli
 * Date: 18/9/19
 * Time: 上午10:39
 */
namespace app\admin\validate;

use think\Validate;

class RewardValidate extends Validate
{
    protected $rule = [
        'reward_id'            => 'require|integer|gt:0',
        'title'         => 'require',
        'grade'        => 'require',
        'ids'           => 'require|array'
    ];
    protected $message = [
        'reward_id.require'            => 'ID不能为空!',
        'reward_id.gt'                 => 'ID不能为空!',
        'title.require'         => '名称不能为空!',
        'grade.require'        => '装备星级不能为空!',
        'ids.require'           => '操作项必须选择!',
        'ids.array'             => '操作项必须选择!',
    ];
    protected $scene = [
        'add'       =>  ['title','grade'],
        'update'    =>  ['reward_id','title','grade'],
        'del'       =>  ['reward_id'],
        'getInfo'   =>  ['reward_id'],
    ];

    //验证正确答案必须为要求值
    protected function checkAnswer($value,$rule, $data)
    {
        $ruleArray = array(0,1,2);
        if (in_array($value,$ruleArray)) {
            return true;
        }
        return '缺少参数';
    }
}