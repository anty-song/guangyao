<?php
/**
 * 脑洞答题验证器
 * User: zhushengli
 * Date: 18/9/19
 * Time: 上午10:39
 */
namespace app\admin\validate;

use think\Validate;

class AnswerValidate extends Validate
{
    protected $rule = [
        'id'            => 'require|integer|gt:0',
        'title'         => 'require',
        'option'        => 'require',
        'tip'           => 'require',
        'answer'        => 'require|checkAnswer',
        'status'        => 'require',
        'ids'           => 'require|array'
    ];
    protected $message = [
        'id.require'            => '题目ID不能为空!',
        'id.gt'                 => '题目ID不能为空!',
        'title.require'         => '题目名称不能为空!',
        'option.require'        => '答案组不能为空!',
        'answer.require'        => '正确答案必须勾选!',
        'tip.require'           => '脑洞不能为空!',
        'status.require'        => '操作状态必须选择!',
        'ids.require'           => '操作项必须选择!',
        'ids.array'             => '操作项必须选择!',
    ];
    protected $scene = [
        'add'       =>  ['title','option','answer','tip'],
        'update'    =>  ['id','title','option','answer','tip'],
        'del'       =>  ['id'],
        'getInfo'   =>  ['id'],
        'setStatus' =>  ['ids','status'],
    ];

    //验证正确答案必须为要求值
    protected function checkAnswer($value,$rule, $data)
    {
        $ruleArray = array(0,1,2);
        if (in_array($value,$ruleArray)) {
            return true;
        }
        return '正确答案必须在所填范围勾选';
    }
}