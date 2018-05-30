import { getApi} from './common.js'
//中奖信息列表
const getRewardList = (page) => {
  return getApi('wcup/lottery/getRewardList',{
    'page':page,
    'limit':10 //默认10条
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
export { getRewardList, getOverMatchList, myPrizeList, GetPrize, scoreRank, inviteRank, myScoreDetail};

