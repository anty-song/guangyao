<?php

namespace app\index\model;

use think\Model;
use think\Session;

/**
 * 基础model
 */
class Base extends Model
{
    //protected $store_id;

    protected function initialize()
    {
        parent::initialize();

        //$this->store_id = Session::get('store_account')['store_id'];
        //if(!$this->store_id){
        //    return ['status'=>0,'code'=>'错误信息'];
        //}
    }

	//插入
    public function insertInfo($param)
    {
    	return $this->insertGetId($param);
    }

	//更新
    public function updateInfo($id,$param)
    {
    	$where=array('id'=>$id);
    	return $this->where($where)->update($param);
    }

	//删除
    public function deleteInfo($id)
    {
    	$where=array('id'=>$id);
    	//return $this->where($where)->delete();
        $param['status'] = 9;
        return $this->where($where)->update($param);
    }

	//记录总数
    public function getCount($where=array())
    {
        return $this->where($where)->count();
    }

	//所有记录
    public function getAllList($where=array())
    {
    	return $this->where($where)->select();
    }

	//分页列表
    public function getPageList($where=array(), $page = 10)
    {

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

        return $this->where($where)->order("id desc")->paginate($page,false,$config);
    }

}
