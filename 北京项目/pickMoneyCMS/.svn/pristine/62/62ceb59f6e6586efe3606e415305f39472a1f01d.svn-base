<?php
/**
 * 广告管理验证器
 * Author: Jason
 * Date: 18/10/10
 * Time: 下午2:05
 */
namespace app\admin\validate;

use think\Validate;

class AdValidate extends Validate
{
    protected $rule = [
        'status'    => 'require',
        't_ids'     => 'require',
        't_name'    => 'require',
        'a_ids'     => 'require',
        //商家广告添加校验
        'name'      =>'require',
        'phone'     =>'require',
        'title'     =>'require',
        'position'  =>'require',
        'type'      =>'require',
        'channel'   =>'require',
        'img'       =>'require',
        'start_time'=>'require',
        'end_time'  =>'require',
        'way'       =>'require',

    ];

    protected $message = [
        'status.require'    => '操作状态不能为空',
        't_ids.require'     => '商家ID不能为空',
        't_name.require'    => '商家名称不能为空',
        'a_ids.require'     => '商家广告ID不能为空',
        //商家广告添加校验
        'name.require'      =>'广告主姓名不能为空',
        'phone.require'     =>'广告主电话不能为空',
        'title.require'     =>'广告的名称不能为空',
        'position.require'  =>'广告展示位置必选',
        'type.require'      =>'投放类型必选',
        'channel.require'   =>'投放渠道必选',
        'img.require'       =>'展示图片必须上传',
        'start_time.require'=>'开始时间必选',
        'end_time.require'  =>'结束时间必选',
        'way.require'       =>'出价方式必选',
    ];

    protected $scene = [
        'setTraderStatus'   => ['status','t_ids'],
        'delTrader'         => ['t_ids'],
        'addTrader'         => ['t_name'],
        'setAdStatus'       => ['a_ids','status'],
        'delAd'             => ['a_ids'],
        'addAd'             => ['name','phone','title','position','type','channel','img','start_time','end_time','way']
    ];
}