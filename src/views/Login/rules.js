export const moblieRules = [
  { required: true, message: '请填写手机号' },
  {
    pattern:
      /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/,
    message: '手机号格式不正确'
  }
]

export const codeRules = [
  { required: true, message: '请填写验证码' },
  { pattern: /^[0-9]{6}$/, message: '验证码格式不正确' }
]
