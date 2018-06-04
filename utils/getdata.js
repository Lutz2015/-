import { getApi} from './common.js'
//抽奖初始化
const initLotteryData = () => {
  return getApi('wcup/lottery/initLotteryData')
}
//抽奖
const lottery = () => {
  return getApi('wcup/lottery/lottery')
}
//冠亚军竞猜国家列表
const championGuessList = () => {
  return getApi('wcup/match/championGuessList')
}
//冠亚军竞猜
const championGuess = (country) => {
  return getApi('wcup/match/championGuess',{
    'country': country
  })
}
//中奖信息列表
const getRewardList = (page,limit = 10) => {
  return getApi('wcup/lottery/getRewardList',{
    'page':page,
    'limit': limit //默认10条
  })
}
//赛事结果
const getOverMatchList = (page) => {
  return getApi('wcup/match/getOverMatchList',{
    'page':page,
    'limit':10 //默认10条
  })
}
//赛事结果
const myPrizeList = (page,status) => {
  return getApi('wcup/my/myPrizeList',{
    'page':page,
    'status': status,//领取状态，0未领取 1已领取，默认0
    'limit':10 //默认10条
  })
}
//我的奖品领取
const GetPrize = (wp_id,name,phone,address) => {
  return getApi('wcup/my/GetPrize',{
    'wp_id': wp_id,
    'name': name,
    'phone':phone,
    'address': address
  })
}
//积分排行榜
const scoreRank = (page) => {
  return getApi('wcup/my/scoreRank', {
    'page': page,
    'limit': 10 //默认10条
  })
}
//邀请好友排行榜
const inviteRank = (page) => {
  return getApi('wcup/my/inviteRank', {
    'page': page,
    'limit': 10 //默认10条
  })
}
//我的积分明细
const myScoreDetail = (page,status) => {
  return getApi('wcup/my/myScoreDetail', {
    'page': page,
    'type': status,
    'limit': 10 //默认10条
  })
}
//我的数据
const myData = () => {
  return getApi('wcup/my/myData')
}
//竞猜记录
const myQuizRecordList = (page, guess_result) => {
  return getApi('wcup/my/myQuizRecordList',{
    'page': page,
    'guess_result': guess_result,
    'limit': 10 //默认10条
  })
}
//邀请好友
const inviteCallBack = (u_loginKey, ui_loginKey) => {
  return getApi('wcup/my/inviteCallBack',{
    'u_loginKey': u_loginKey,
    'ui_loginKey': ui_loginKey
  })
}
//赛事竞猜列表
const matchGuessList = (status) => {
  return getApi('wcup/match/matchGuessList',{
    'status': status
  })
}
//我要竞猜
const matchGuess = (data) => {
  return getApi('wcup/match/matchGuess', data)
}
//获取首页banner轮播图配置信息
const getBannerInfo = (data) => {
  return getApi('wcup/index/getBannerInfo', data)
}
//赛事通知
const matchMessage = () => {
  return getApi('wcup/index/matchMessage')
}
//获取常见问题
const question = () => {
  return getApi('wcup/my/question')
}
//首页规则
const guessRule = () => {
  return getApi('wcup/match/guessRule')
}
//冠亚军规则
const guessChampionRule = () => {
  return getApi('wcup/match/guessChampionRule')
}
//抽奖页规则
const lotteryrule = () => {
  return getApi('wcup/lottery/rule')
}
//邀请页规则
const inviteRule = () => {
  return getApi('wcup/index/inviteRule')
}
//模版消息
const wxopensave = (formid) => {
  return getApi('wcup/wxopen/save',{
    'action':'saveMsgTpl',
    'formId': formid
  })
}
export { getRewardList, getOverMatchList, myPrizeList, GetPrize, scoreRank, inviteRank, myScoreDetail, myData, myQuizRecordList, inviteCallBack, matchGuessList, matchGuess, initLotteryData, lottery, getBannerInfo, championGuessList, championGuess, question, guessRule, guessChampionRule, matchMessage, lotteryrule, inviteRule, wxopensave};

