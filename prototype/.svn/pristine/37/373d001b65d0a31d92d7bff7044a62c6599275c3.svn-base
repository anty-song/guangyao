<?php
namespace app\prototype\model;

use think\Model;
use think\Session;

/**
 * 基础model
 */
class BaseModel extends Model{
	protected $db_fix_ver;

	protected function initialize (){
		parent::initialize();
	}

	//插入记录
	public function insertInfo($param){
		return $this->insertGetId($param);
	}

	//更新记录
	public function updateInfo($where = array(),$param){
		return $this->where($where)->update($param);
	}

	//删除记录
	public function deleteInfo($id){
		$where=array('id'=>$id);
		//return $this->where($where)->delete();
		$param['status'] = 9;
		return $this->where($where)->update($param);
	}

	//记录总数
	public function getCount($where=array()){
		return $this->where($where)->count();
	}

	//一条记录
	public function getInfo($where=array()){
		return $this->where($where)->find();
	}

	//所有记录
	public function getAllList($where=array()){
		return $this->where($where)->select();
	}

	//分页列表
	public function getPageList($where=array(),$page = 10,$order = 'addtime',$desc = 'asc'){

		$config = [
			//'type'     => 'Bootstrap',
			//'var_page' => 'page',
			//使用jqery 无刷新分页
			//'path'=>'javascript:AjaxPage([PAGE]);',
			//第一种方法，使用数组方式传入参数
			//'query' => ['keyword'=>$keyword],
			//第二种方法，使用函数助手传入参数
			'query' => request()->param(),
		];

		return $this->where($where)->order("$order $desc")->paginate($page,false,$config);
	}

}
