const COMMON_URL = 'http://xuexi.yewu99.com:8089/wx/interface/';
module.exports = {
  // 科目分类列表
  SHOW_CATEGORY: COMMON_URL + 'xiuchang.php?action=category',
  // 课程分类
  SUBJECT_CATEGORY: COMMON_URL + 'xiuchang.php?action=subject',
  // 推荐页面广告
  SHOW_AD: COMMON_URL + 'xiuchang.php?action=getad',
  // 秀场推荐内容 获取同学圈的秀
  SHOW_RECOMMEND: COMMON_URL + 'xiuchang.php?action=recommend',
  // 获取关注人的秀
  SHOW_ATTENTION: COMMON_URL + 'getuser.php?action=getmyattentionxiu',
  // 附近内容
  SHOW_NEARBY: COMMON_URL + 'xiuchang.php?action=nearby',
  // 一级评论
  SHOW_COMMENTS: COMMON_URL + 'xiuchang.php?action=detailcomments',
  // 二级评论
  SHOW_CHILDCOMMENTS: COMMON_URL + 'xiuchang.php?action=getchildrencomments',
  // 验证是否绑定手机
  USER_VERIFY: COMMON_URL + 'user.php?action=verfiyaccount',
  // 绑定手机号
  USER_BIND: COMMON_URL + 'user.php?action=bindaccount',
  // 发送验证码
  USER_SENDYZM: COMMON_URL + 'user.php?action=sendSms',
  // 发表评论
  SENDCOMMENT: COMMON_URL + 'setuser.php?action=sendcomments',
  // 我的钱包
  WALLET: COMMON_URL + 'getuser.php?action=getmoney',
  // 获得我的秀
  MINE: COMMON_URL + 'getuser.php?action=getmyxiu',
  // 获得我收藏的秀
  COLLECTED: COMMON_URL + 'getuser.php?action=getmycollectionxiu',
  LIKE: COMMON_URL + 'setuser.php?action=setagrees'
}