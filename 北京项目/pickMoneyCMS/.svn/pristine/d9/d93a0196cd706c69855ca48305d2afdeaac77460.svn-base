<?php
/**
 * 活动管理-百万红包
 * Date: 18/9/17
 * Time: 上午10:43
 */
namespace app\admin\controller;

use think\Controller;

use app\admin\model\QuestionModel;

class Question extends BaseController
{
    protected $question_model;
    protected function initialize()
    {
        parent::initialize();
        $this->question_model = new QuestionModel();
    }

    public function index(){
        //每页显示条数
        $page_size = 10;
        //分页列表数据
        $res = $this->question_model->getListByPage(0,$page_size);
        $list = $res['list'];

        $this->assign('list',$list);
        $this->assign('empty','<tr><td colspan="8">暂无数据</td></tr>');
        $this->assign('page',$res['page']);

        return $this->fetch();
    }

    /**
     * 添加+更新操作
     * 无ID进行数据添加，有ID进行数据更新
     * @return \think\response\Json
     */
    public function do_question()
    {
        $id = $this->request->param('question_id',0,'intval');
        //需要添加或修改的数据
        $data = $this->request->param();

        //id为0,添加数据
        if (empty($id)) {
            //验证数据
            $add_validate_res = $this->validate($data,'QuestionValidate.add');

            if ($add_validate_res !== true) {
                return json(['status'=>0,'msg'=>$add_validate_res]);
            } else {
                $add_data['question'] = $data['question'];
                $add_data['answer1'] = $data['answer1'];
                $add_data['answer2'] = $data['answer2'];
                $add_data['answer3'] = $data['answer3'];
                unset($data);
                $add_res = $this->question_model->add($add_data);

                if ($add_res) {
                    return json(['status'=>1,'msg'=>'添加成功']);
                } else {
                    return json(['status'=>0,'msg'=>'添加失败']);
                }
            }
        } else {//更新操作
            //验证数据
            $up_validate_res = $this->validate($data,'QuestionValidate.update');
            if ($up_validate_res !== true) {
                return json(['status'=>0,'msg'=>$up_validate_res]);
            } else {
                $up_data['question'] = $data['question'];
                $up_data['answer1'] = $data['answer1'];
                $up_data['answer2'] = $data['answer2'];
                $up_data['answer3'] = $data['answer3'];
                unset($data);
                $up_res = $this->question_model->edit($id,$up_data);
                if ($up_res) {
                    return json(['status'=>1,'msg'=>'更新成功']);
                } else {
                    return json(['status'=>0,'msg'=>'更新失败']);
                }
            }
        }
    }

    /**
     * 获取一条题目数据
     * id为必要参数,且不为0
     * @return \think\response\Json
     */
    public function get_info()
    {
        $id = $this->request->param('id',0,'intval');
        $data['question_id'] = $id;

        $get_validate_res = $this->validate($data,'QuestionValidate.getInfo');

        if ($get_validate_res !== true) {
            return json(['status'=>0,'msg'=>$get_validate_res]);
        } else {
            $get_info = $this->question_model->getOneInfo($id);

            return json(['status'=>1,'data'=>$get_info]);
        }
    }

    /**
     * 删除一条题目数据
     * id(int)为必填参数
     * @return \think\response\Json
     */
    public function del()
    {
        $id = $this->request->param('id',0,'intval');

        $data['question_id'] = $id;
        $del_validate_res = $this->validate($data,'QuestionValidate.del');
        if ($del_validate_res !== true) {
            return json(['status'=>0,'msg'=>$del_validate_res]);
        } else {
            $del_res = $this->question_model->del($id);
            if ($del_res) {
                return json(['status'=>1,'msg'=>'删除成功']);
            } else {
                return json(['status'=>0,'msg'=>'删除失败']);
            }
        }
    }


    /****神秘装备**START****/

    public function reward(){
        //每页显示条数
        $page_size = 10;
        //分页列表数据
        $res = $this->question_model->getRewardListByPage(0,$page_size);
        $list = $res['list'];

        $this->assign('list',$list);
        $this->assign('empty','<tr><td colspan="8">暂无数据</td></tr>');
        $this->assign('page',$res['page']);

        return $this->fetch();
    }

    public function add_reward()
    {
        $id = $this->request->param('reward_id',0,'intval');
        //需要添加或修改的数据
        $data = $this->request->param();
        
        //id为0,添加数据
        if (empty($id)) {

            $file = request()->file('image');
            if (empty($file)) {
                return json(['status'=>0,'msg'=>'装备图片必须上传']);
            }

            $add_validate = $this->validate($data,'RewardValidate.add');
            if ($add_validate !== true) {
                return json(['status'=>0,'msg'=>$add_validate]);
            }

            // 移动到框架应用根目录/uploads/ 目录下
            $info = $file->move( '../public/uploads/reward_images');
            if($info){
                
                $pic_url = '/uploads/reward_images/'.$info->getSaveName();

                // 图片水印
                // $image = \think\Image::open($_SERVER['DOCUMENT_ROOT'].$pic_url);
                // $image->water($_SERVER['DOCUMENT_ROOT'].'/123.png',array(593,883))->save($_SERVER['DOCUMENT_ROOT'].$pic_url);
                
                $add_data['pic_name'] = $info->getFilename();
            }else{
                // 上传失败获取错误信息
                // echo $file->getError();
                return json(['status'=>0,'msg'=>$file->getError()]);
            }
          
            $add_data['title'] = $data['title'];
            $add_data['grade'] = $data['grade'];;
            $add_data['pic_url'] = $pic_url;
            $add_data['generate_num'] = 0;
            $add_data['identify_num'] = 0;
            unset($data);
            $add_res = $this->question_model->addReward($add_data);
            if ($add_res) {
                return json(['status'=>1,'msg'=>'添加成功']);
            } else {
                return json(['status'=>0,'msg'=>'添加失败']);
            }
        }else{
            $up_validate = $this->validate($data,'RewardValidate.update');
            if ($up_validate !== true) {
                return json(['status'=>0,'msg'=>$up_validate]);
            }
            $old_pic_url = '';
            if(!empty($_FILES['image']['name'])){
                $file = request()->file('image');
                
                if ($file) {
                    // 移动到框架应用根目录/uploads/ 目录下
                    $info = $file->move( '../public/uploads/reward_images');
                    if($info){
                        
                        $savename = str_replace("\\","/",$info->getSaveName());
                        $pic_url = '/uploads/reward_images/'.$savename;

                        // 图片水印
                        // $image = \think\Image::open($_SERVER['DOCUMENT_ROOT'].$pic_url);
                        // $image->water($_SERVER['DOCUMENT_ROOT'].'/123.png',array(593,883))->save($_SERVER['DOCUMENT_ROOT'].$pic_url); 
 
                        $up_data['pic_name'] = $info->getFilename();
                        $old_pic_url = $data['pic_url'];
                    }else{
                        // 上传失败获取错误信息
                        // echo $file->getError();
                        return json(['status'=>0,'msg'=>$file->getError()]);
                    }
                }
            }
            if(empty($pic_url))$pic_url = $data['pic_url'];
            
            $up_data['title'] = $data['title'];
            $up_data['grade'] = $data['grade'];;
            $up_data['pic_url'] = $pic_url;
            unset($data);
            unset($info);
            $up_res = $this->question_model->editReward($id,$up_data);
            if ($up_res) {
                if(!empty($old_pic_url)){
                    @unlink($_SERVER['DOCUMENT_ROOT'].$old_pic_url);
                }
                return json(['status'=>1,'msg'=>'更新成功']);
            } else {
                return json(['status'=>0,'msg'=>'更新失败']);
            }
        }
    }

    public function get_reward_info()
    {
        $id = $this->request->param('id',0,'intval');
        $data['reward_id'] = $id;

        $get_validate_res = $this->validate($data,'RewardValidate.getInfo');

        if ($get_validate_res !== true) {
            return json(['status'=>0,'msg'=>$get_validate_res]);
        } else {
            $get_info = $this->question_model->getRewardOneInfo($id);

            return json(['status'=>1,'data'=>$get_info]);
        }
    }

    public function del_reward()
    {
        $id = $this->request->param('id',0,'intval');
        
        $data['reward_id'] = $id;
        $del_validate_res = $this->validate($data,'RewardValidate.del');
        if ($del_validate_res !== true) {
            return json(['status'=>0,'msg'=>$del_validate_res]);
        } else {
            $del_res = $this->question_model->delReward($id);
            if ($del_res) {
                return json(['status'=>1,'msg'=>'删除成功']);
            } else {
                return json(['status'=>0,'msg'=>'删除失败']);
            }
        }
    }


}