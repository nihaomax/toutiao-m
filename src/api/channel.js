import request from '@/utils/request'
import storage from '@/utils/storage'

// 获取用户的频道
export const getMyChannel = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}

/**
 * 获取所有频道列表
 * @returns
 */
export const getAllChannelApi = () =>
  request({
    url: '/v1_0/channels'
  })

/**
 * 删除指定频道
 * @param {*} target 用户频道的id
 */
export const delMyChannelApi = (target) => {
  return request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE'
  })
}

/**
 *
 * @param {*} id  频道id
 * @param {*} seq 添加频道的索引值
 * @returns
 */
export const addMyChannelApi = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}

// 这两个函数是在用户没有登录的时候调用，用来在将数据存在本地和在本地取数据
const HEIMA_TOUTIAO_MY_CHANNELS = 'HEIMA_TOUTIAO_MY_CHANNELS'
export const setMyChannelsToLocal = (myChannels) => {
  storage.set(HEIMA_TOUTIAO_MY_CHANNELS, myChannels)
}

export const getMyChannelsByLocal = () => {
  return storage.get(HEIMA_TOUTIAO_MY_CHANNELS)
}
