<?php
// +----------------------------------------------------------------------
// | 测试演示用UserList
// +----------------------------------------------------------------------
// | Author: seaboyer <seaboyer@163.com>
// | Date: 2018-09-06
// +----------------------------------------------------------------------

namespace app\api\controller;

use app\api\controller\BaseController;

use app\api\model\MUserList;
use app\api\model\CMUserList;
//use DES\QbDES;


class UserList extends BaseController
{
	protected $m_MUserList;

	public function __construct()
    {
		parent::__construct();

		$this->m_MUserList = new MUserList();

	}

	/**
	 * @cc 项目列表
	 * @Author   seaboyer@163.com
	 * @DateTime 2018-08-22
	 * @return   [type]        [description]
	 */
	public function index()
    {
        //$uid = isset($this->request_action) ? intval($this->request_action) : 1;
        $action = $this->request_action;
        if (!empty($action)) {
            switch($action)
            {
                //case 'red_packet_list';
                //case 'red_packet_list';
                case 'red_packet_list';
                    //echo 'Good choice';
                    $this->red_packet_list();
                    break;
                default;
                    break;
            }
        } else {
            $str = '1535624374,333,4ee4479f10b8b0a55c8c2678e3c353b6,40.079978,116.355066,110114';
            echo $str."<br>";
            echo sdk_encrypt($str);
        }


        /*
		$uid = $this->request->param("uid", 1, "intval");
		$i_type = $this->request->param("i_type", 0, "intval");
		$s_title = $this->request->param("s_title", '', "trim");

        $s_date1 = $this->request->param("s_date1", '', "trim");
        $s_date2 = $this->request->param("s_date2", '', "trim");


        if(!empty($this->request_param)){
            $uid = $this->request_param['uid'];
        }else{
            $uid = 1;
        }

		//$i_day1 = strtotime($s_date1);
        //$i_day2 = strtotime($s_date2." 23:59:59");

		$where = [];
        if(!empty($uid)) $where[] = ['uid','=',$uid];

		if($i_type) $where[] = ['p_type', '=', $i_type];
        if($s_title) $where[] = array('p_title', 'like', '%'.$s_title.'%');
        if($i_day1) $where[] = array('add_time', ['gt', $i_day1], ['lt',$i_day2]);
        if($i_status) $where[] = array('status', 'in', [1,2,3,4]);
        if($i_day1) $where[] =  array('add_time', 'between', [$i_day1,$i_day2]);


		//$list_user_list = $this->m_MUserList->getUserList($where);
        $table_name = 'm_user_list';
		$m_CMUserList = new CMUserList();
        //$table_name
        $m_CMUserList->setTableName($table_name);
		$list_user_list = $m_CMUserList->getUserList($where);
        /*
        $qb_des = new QbDES();
        $arr = array();
        $arr['u_id'] = 123;
        $arr['u_name'] = 'supper';
        $arr['u_pass'] = 'abc123';
		$str_test = json_encode($arr);
		echo "str_test=".$str_test."<br>";
		$str_encrypt = $qb_des->encrypt($str_test);
		echo "str_encrypt=".$str_encrypt."<br>";
		$str_decrypt = $qb_des->decrypt($str_encrypt);
		echo "str_decrypt=".$str_decrypt."<br>";
		*/



        //return sdk_encrypt($list_user_list);

	}

    public function redTest()
    {
        echo "redTest";
    }


	//?action=red_packet_list&paramData=cPx1ZZdjV8uZK2q5E0hOAmMBmLe1RWVoqOLQ2q3fWYJaGSFfUEO1k41feN7VrN6GBjlStfudMrGZxrzDPMLb6ehwVBU%2FCK%2F5GTuLWK57xrA%3D
	public function red_packet_list()
    {
        echo "in red_packet_list <br>";
        dump($this->request_param);

        $uid = isset($this->request_param) ? intval($this->request_param) : 1;
        $where = array();
        if(!empty($uid)) $where['uid'] = $uid;
        $table_name = 'm_user_list';
        $m_CMUserList = new CMUserList();
        //$table_name
        $m_CMUserList->setTableName($table_name);
        $list_user_list = $m_CMUserList->getUserList($where);
        return sdk_encrypt($list_user_list);
    }

	/**
	 * @cc 编辑项目
	 * @Author   seaboyer@163.com
	 * @DateTime 2018-08-22
	 * @return   [type]        [description]
	 */
	public function project_edit()
    {
		if($this->request->isAjax()){
			$param = input("post.");
            unset($param['project_id']);

			$validate = Loader::validate('UserList');
			if(!$validate->check($param)){
				return ['status'=>0,'msg'=>$validate->getError()];
			}

			$res = $this->m_MUserList->insertInfo($param);

			if ($res) {
				return ['status'=>1, 'msg'=>'添加项目成功', 'url'=>url('api/product/index')];
			} else {
				return ['status'=>0, 'msg'=>'添加项目失败'];
			}

			for ($i = 0; $i <= 100; $i++) {
			    //todo
            }
		}

        $id = input("get.id");
        $data_type = $this->m_MUserList->getPageList($id);
        $this->assign('data_type', $data_type);

		return view();
	}

	/**
	 * @cc 删除项目
	 * @Author   seaboyer@163.com
	 * @DateTime 2018-08-22
	 * @return   [type]        [description]
	 */
	public function project_delete()
    {
		$id = input("post.id");
		if ($this->m_MUserList->deleteInfo($id)) {
			//logger("删除项目ID为".$project_id);
			return ['status'=>1, 'msg'=>'删除项目成功'];
		} else {
			return ['status'=>0, 'msg'=>'删除项目失败'];
		}
	}

}
