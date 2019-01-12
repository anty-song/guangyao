<?php
// +----------------------------------------------------------------------
// | 测试演示用RedPacket
// +----------------------------------------------------------------------
// | Author: seaboyer <seaboyer@163.com>
// | Date: 2018-09-06
// +----------------------------------------------------------------------

namespace app\api\validate;

use think\Validate;

class RedPacket extends Validate
{
	protected $rule = [
	        'p_title'  =>  'require|max:64',
	        'p_img' =>  'require',
	        
	    ];

	protected $message  =   [
	        'p_title.require' => '名称不能为空',
	        'p_title.max'     => '名称最多不能超过64个字符',
	        'p_img.require' => '封面不能为空',
	    ];
}
