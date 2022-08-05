import request from '@/utils/request'

// axios 做了封装，post请求自动加Content-Type application/json
// params 查询参数传参 'baseUrl+/v1_0/authorizations?name=张三' 请求方式是GET请求
// data请求体传参：请求报文携带 请求方式是POST请求
// parameter

/**
 *
 * @param {*String} mobile  手机号
 * @param {*String} code   验证码
 * @returns
 */
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}

/**
 * 发送验证码
 * @param {*String} mobile
 * @returns  promise
 */

export const getCodeApi = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}

// 获取用户自己的资料
export const userInfoApi = () => {
  return request({
    url: '/v1_0/user'
  })
}

/**
 * 获取个人用户信息
 * @returns
 */
export const getUserInfoApi = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}
