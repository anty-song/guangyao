<?php
 
namespace app\util;
 
use think\Controller;
use Request;

class WeixinUtil extends Controller
{
	private $token = "bfa01623188c93f8b53ed90f0e0c6864";
    /**
     * 显示资源列表
     *
     * @return \think\Response
     */
    public function check()
    {
        $signature = Request::param('signature');
        $timestamp = Request::param('timestamp');
        $nonce = Request::param('nonce');
        $echostr = Request::param('echostr');
        
        // 根据字典序排序
        $arrayName = array($timestamp,$nonce,$this->token);
        // 转化为字符串
        $temp = implode($arrayName);
        // 对字符串进行加密
        $temp = sha1($temp);
        if($temp == $signature){
        	echo $echostr;
        }
    }

	function get_public_access_token($appid,$appsecret)
	{
		$memcache = new Memcache;
		//global $CFG;
		//$memcache->connect(config['memcache_host'], $CFG['memcache_port']) or die('err_');
		$memcache->get_memcache();
		$weixin_access_token='';
		$weixin_access_token_key="weixin_access_token";
		if ($memcache->get($weixin_access_token_key)) {
			$weixin_access_token=$memcache->get($weixin_access_token_key);
		} else {
			$get_url='https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='.$appid.'&secret='.$appsecret;
			$response=$this->curl_post($get_url);
			$res_arr=json_decode($response,true);
			if(isset($res_arr['access_token']) && isset($res_arr['expires_in']))
			{
				$weixin_access_token=$res_arr['access_token'];
				$memcache->set($weixin_access_token_key,$res_arr['access_token'],false,$res_arr['expires_in']);
			}
			
		}
		//$memcache->close();
		return $weixin_access_token;
	}    
 
   
}
