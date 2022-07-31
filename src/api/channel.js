import request from '@/utils/request'

// 获取用户的频道
export const getMyChannel = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
