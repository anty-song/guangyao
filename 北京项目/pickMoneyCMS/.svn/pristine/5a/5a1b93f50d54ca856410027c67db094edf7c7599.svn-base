<?php
/**
 * 百万红包活动验证器
 * Author: Jason
 * Date: 18/9/21
 * Time: 上午9:23
 */
namespace app\admin\validate;

use think\Validate;

class MillionsValidate extends Validate
{
    protected $rule = [
        'title'         => 'require',
        'id'            => 'require|integer|gt:0',
        'user_limit'    => 'require|integer|gt:0',
        'price_min'     => 'require|float|egt:1',
        'price_max'     => 'require|float|gt:1',
        'invite_num'    => 'require|integer|gt:0',
        'invite'        => 'require',
        'radio'         => 'require|integer|gt:0',
        'c_id'          => 'require',
        'status'        => 'require'


    ];

    protected $message = [
        'title.require'         => '红包名称不能为空!',
        'id.require'            => '活动ID不能为空!',
        'id.gt'                 => '活动ID不能为空!',
        'id.integer'            => '活动ID不能为空!',
        'user_limit.require'    => '红包上限不能为空!',
        'user_limit.integer'    => '红包上限不能为空!',
        'user_limit.gt'         => '红包上限不能为空!',

        'price_min.require'     => '红包金额下限不能为空',
        'price_max.require'     => '红包金额上限不能为空',
        'invite_num.require'    => '邀请的人数不能为空',
        'invite.require'        => '金额衰减不能为空',
        'radio.require'         => '红包比重不能为空',

        'price_min.float'       => '红包金额格式不正确',
        'price_max.float'       => '红包金额上限格式不正确',
        'invite_num.integer'    => '邀请的人数格式不正确',
        'radio.integer'         => '红包比重格式不正确',

        'price_min.egt'     => '红包金额下限必须大于1元',
        'price_max.gt'      => '红包金额上限金额不正确',
        'invite_num.gt'     => '邀请的人数格式不正确',
        'radio.gt'          => '红包比重格式不正确',

        'c_id.require'      => '红包配置ID不能为空',
        'status.require'    => '操作状态不能为空',
    ];

    protected $scene = [
        'upUserLimit'       => ['id','user_limit'],
        'addConfig'         => ['title','id','price_min','price_max','invite_num','invite','radio'],
        'setConfigStatus'   => ['c_id','status'],
        'delConfig'         => ['c_id'],
        'upConfig'          => ['c_id','price_min','price_max']
    ];
}