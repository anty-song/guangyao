<?php
/**
 * 脑洞答题验证器
 * User: zhushengli
 * Date: 18/9/19
 * Time: 上午10:39
 */
namespace app\admin\validate;

use think\Validate;

class QuestionValidate extends Validate
{
    protected $rule = [
        'question_id'            => 'require|integer|gt:0',
        'question'         => 'require',
        'answer1'        => 'require',
        'answer2'           => 'require',
        'ids'           => 'require|array'
    ];
    protected $message = [
        'question_id.require'            => '题目ID不能为空!',
        'question_id.gt'                 => '题目ID不能为空!',
        'question.require'         => '题目名称不能为空!',
        'answer1.require'        => '答案组不能为空!',
        'answer2.require'        => '答案组不能为空!',
        'answer3.require'        => '答案组不能为空!',
        'ids.require'           => '操作项必须选择!',
        'ids.array'             => '操作项必须选择!',
    ];
    protected $scene = [
        'add'       =>  ['question','answer1','answer2','answer3'],
        'update'    =>  ['question_id','question','answer1','answer2','answer3'],
        'del'       =>  ['question_id'],
        'getInfo'   =>  ['question_id'],
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