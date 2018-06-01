import { getApi} from './common.js'
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
export { getRewardList, getOverMatchList, myPrizeList, GetPrize, scoreRank, inviteRank, myScoreDetail, myData, myQuizRecordList, inviteCallBack, matchGuessList, matchGuess};

