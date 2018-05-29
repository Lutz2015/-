import { getApi} from './common.js'
//每日推荐
const dailyRecomment = () => {
  return getApi('vapi/music/dailyRecomment')
}
export { dailyRecomment };

