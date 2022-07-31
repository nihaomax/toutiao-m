<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="登录" />
    <!-- 表单 -->
    <van-form @submit="onSubmit" class="form" ref="form">
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
        <template #button>
          <van-button
            size="mini"
            class="code-btn"
            round
            native-type="button"
            v-if="isShowCode"
            @click="sendCode"
            >获取验证码</van-button
          >
          <van-count-down
            :time="6 * 1000"
            format="ss秒"
            v-else
            @finish="isShowCode = true"
          />
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
import { login, getCodeApi } from '@/api'

export default {
  name: 'Login',
  data() {
    return {
      mobile: '',
      code: '',
      moblieRules,
      codeRules,
      isShowCode: true
    }
  },
  methods: {
    // 这里可以把请提示这个函数抽取出来，要用的时候再抽取出来
    loging() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
    },
    // 结构赋值
    //  - 数组 const [a,b] = ['你好','hello'] 拥有命名权
    //  - 对象 const { name,age } = {name:'张三',age:18} 没有命名权
    //  - 对象的连续解构赋值 : 一层层的来const { friend:{ name } } = {name:'张三',friend:{ name:'李四' }}
    //  - 对象结构赋值当中的命名 const { friend:{ name:person } } = {name:'张三',friend:{ name:'李四' }}
    async onSubmit() {
      // q1:res是axios封装的对象，把服务端返回的数据放在res.data里
      // q2:res是promise的resolve的值
      // q3：error是promise的reject的结果
      // axios封装的error
      // error.response.data是服务端返回的数据
      // error.response.status 是服务器返回的状态码

      try {
        this.loging()
        const {
          data: { data: token }
        } = await login(this.mobile, this.code)
        console.log(token)
        // 获取到token传递到vuex中
        this.$store.commit('SET_TOKEN', token)

        // 登录成功之后跳转到profile 我的页面
        this.$router.push('/my')

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
    },
    // 获取验证码
    sendCode() {
      // 1.验证手机号
      this.$refs.form.validate('mobile').then(async () => {
        this.loging()
        // 2.发起请求
        try {
          const res = await getCodeApi(this.mobile)
          // console.log(res)
          this.$toast.success('验证码获取成功')
        } catch (e) {
          console.log(e)
          const status = e.response.status
          let message = '手机号不正确'
          if (status === 429) {
            message = e.response.data.message
          }
          this.$toast.fail(message)
        }

        // 3.显示倒计时
        this.isShowCode = false
      })
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
:deep(.code-btn) {
  &.van-button--mini {
    padding: 0 0.2rem;
  }
  &.van-button--default {
    background-color: #eee;
    color: #a9929b;
  }
}
</style>
