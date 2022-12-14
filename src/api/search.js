import request from '@/utils/request'

/**
 * 获取搜索建议
 * @param {String} q 搜索关键词
 * @returns
 */
export const getSearchSuggetionsApi = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: { q }
  })
}

export const getSearchResultApi = (params) => {
  return request({
    url: '/v1_0/search',
    params
  })
}
