<?php

namespace app\prototype\model;

class PrototypeAdmin extends BaseModel
{
	// 设置当前模型对应的完整数据表名称
	protected $pk = 'userid';

	/*public function getAdminList () {
		return $this->hasOne('PrototypeName','userid','userid');
	}*/
}
