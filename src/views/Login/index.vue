<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="登录" />
    <!-- 表单 -->
    <van-form @submit="onSubmit" class="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="moblieRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma1"></span>
        </template>
      </van-field>
      <div class="submit">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { moblieRules, codeRules } from './rules'
import { login } from '@/api/user'
export default {
  name: 'Login',
  data() {
    return {
      mobile: '',
      code: '',
      moblieRules,
      codeRules
    }
  },
  methods: {
    async onSubmit() {
      // q1:res是axios封装的对象，把服务端返回的数据放在res.data里
      // q2:res是promise的resolve的值
      // q3：error是promise的reject的结果
      // axios封装的error
      // error.response.data是服务端返回的数据
      // error.response.status 是服务器返回的状态码

      try {
        const res = await login(this.mobile, this.code)
        console.log(res)
        this.$toast.success('登录成功')
      } catch (e) {
        console.log(e)
        const status = e.response.status
        // 让message默认为请重新登录
        let message = '请重新登录'
        // 如果状态码===400的时候，那就返回错误信息
        if (status === 400) {
          // 如果状态码为400 message就重新赋值为服务端返回的数据里面的message
          message = e.response.data.message
        }
        this.$toast.fail(message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
// 穿透样式 因为vant是全局的 但是scoped只在这个组件中生效 所以我们加一个:deep(穿透的类名) 可以改样式
// :deep(穿透的类名)
.van-nav-bar {
  background-color: #3296fa;

  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
.submit {
  margin: 16px;
}

.toutiao {
  font-size: 40px;
}

:deep(.form) {
  .van-field__label {
    flex: 1;
  }
  .van-cell__value {
    flex: 20;
  }
  // 按钮样式
  .van-button--info {
    background-color: #6db4fb !important;
    border: 0;
    width: 694px;
    height: 88px;
    margin: auto;
    margin-top: 50px;
    border-radius: 10px;
  }
}
</style>
