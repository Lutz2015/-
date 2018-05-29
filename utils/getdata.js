import { getApi} from './common.js'
//中奖信息列表
const getRewardList = (page) => {
  return getApi('wcup/lottery/getRewardList',{
    page:page,
    limit:10 //默认10条
  })
}
//赛事结果
const getOverMatchList = (page) => {
  return getApi('wcup/match/getOverMatchList',{
    page:page,
    limit:10 //默认10条
  })
}
export { getRewardList, getOverMatchList };

