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

/**
 *
 * @param {*} file 图片的file对象
 * @returns
 */

// 如果传的是对象, axios默认将对象转成json并且加上content-type=application/json
// 如果传的是formDate表单, 那么axios会将表单提交给后端, 并且默认的加上content-type=mutipart/form-data
// 如果后端要的是表单(form-data)
// const fm = new FormData()
// fm.append(表单的name,表单项)
export const uploadAvator = (file) => {
  const fm = new FormData()
  fm.append('photo', file)
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: fm
  })
}

// 编辑个人资料

export const editUserProfileApi = (data) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data
  })
}

// 关注用户
/**
 *
 * @param {*} target 关注用户的id
 * @returns
 */
export const followUsersApi = (target) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: target
  })
}
