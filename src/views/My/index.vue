<template>
  <div class="body1">
    <!-- 头部区域 -->
    <header>
      <!-- 登录后的my -->
      <div class="login" v-if="isLogin">
        <!-- 头像 -->
        <div class="userimg">
          <div class="left">
            <div class="img"><img :src="infoList.photo" alt="" /></div>
            <span>{{ infoList.name }}</span>
          </div>
          <div class="right">
            <van-button type="primary">编辑资料</van-button>
          </div>
        </div>
        <!-- 消息栏 -->
        <div class="guanzhu">
          <van-row>
            <van-col span="6">
              <div>{{ infoList.art_count }}</div>
              <span>头条</span>
            </van-col>
            <van-col span="6">
              <div>{{ infoList.fans_count }}</div>
              <span>粉丝</span>
            </van-col>
            <van-col span="6">
              <div>{{ infoList.follow_count }}</div>
              <span>关注</span>
            </van-col>
            <van-col span="6">
              <div>{{ infoList.like_count }}</div>
              <span>获赞</span>
            </van-col>
          </van-row>
        </div>
      </div>
      <!-- 登录前的my -->
      <div class="logout" v-else>
        <!-- 头像部分 -->
        <div class="user" @click="btnlogin">
          <img src="@/assets/images/mobile.png" alt="" />
        </div>
        <span class="loginBtn">登录 / 注册</span>
      </div>
    </header>
    <!-- 中间区域 -->
    <main>
      <!-- 收藏和历史部分 -->
      <div class="shoucang">
        <van-row>
          <van-col span="12" class="borderleft">
            <van-icon name="star-o" />
            <span>收藏</span>
          </van-col>
          <van-col span="12">
            <van-icon name="underway-o" />
            <span>历史</span>
          </van-col>
        </van-row>
      </div>
      <!-- 消息通知 小智同学 弹出层 -->
      <div class="userinfo">
        <van-cell is-link>消息通知</van-cell>
        <van-cell is-link>小智同学</van-cell>
      </div>
      <!-- <van-popup v-model="show">内容</van-popup> -->
    </main>
    <!-- 底部退出区域 -->
    <footer class="outBtn">
      <van-button type="default" v-if="isLogin" @click="logout"
        >退出</van-button
      >
    </footer>
  </div>
</template>

<script>
import { userInfoApi } from '@/api'
export default {
  data() {
    return {
      infoList: []
    }
  },
  computed: {
    isLogin() {
      // !!转成布尔值
      return !!this.$store.state.tokenObj.token
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    logout() {
      this.$store.commit('SET_TOKEN', {})
    },
    btnlogin() {
      this.$router.push('/login')
    },
    async getUserInfo() {
      try {
        const {
          data: { data }
        } = await userInfoApi()
        this.infoList = data
        // console.log(data)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.body1 {
  height: 100% !important;
  background-color: #f5f7f9;
}
// 登录后的盒子样式
.login {
  position: relative;
  height: 400px;
  background: url('@/assets/images/banner.png');
  background-size: contain;

  .userimg {
    display: flex;
    justify-content: space-between;

    position: absolute;
    top: 102px;
    width: 100%;
    .left {
      display: flex;
      align-items: center;
      .img {
        width: 132px;
        height: 132px;
        border-radius: 50%;
        border: 1px solid #fff;
        margin-left: 32px;
        background-color: #fff;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
      span {
        margin-left: 22px;
        color: #fff;
        font-size: 30px;
      }
    }
    .right {
      .van-button--primary {
        width: 120px;
        height: 33px;
        background-color: #ffffff;
        border-radius: 16px;
        border: unset;
        color: #666666;
        font-size: 15px;
        margin-top: 50px;
        margin-right: 33px;
      }
      .van-button--normal {
        padding: 0;
      }
    }
  }

  .guanzhu {
    .van-row {
      display: flex;
      position: absolute;
      width: 100%;
      top: 290px;
      text-align: center;
      color: #fff;
      .van-col {
        background-color: transparent;
        border: unset;
        display: flex;
        flex-direction: column;
        flex: 1;

        div {
          font-size: 36px;
        }
        span {
          font-size: 23px;
          margin-top: 15px;
        }
      }
    }
  }
}
// 登录前的盒子样式
.logout {
  position: relative;
  height: 400px;
  background: url('@/assets/images/banner.png');
  background-size: contain;

  .user {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 132px;
    height: 132px;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 50%;
    img {
      width: 100%;
    }
  }
  .loginBtn {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, 195%);
    font-size: 28px;
    color: #fff;
  }
}

.shoucang {
  :deep(.van-col) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 10px;
    border-left: 1px solid #edeff3;
    background-color: #fff;
    .van-icon {
      font-size: 50px;

      &.van-icon-star-o {
        color: #eb5253;
      }

      &.van-icon-underway-o {
        color: #ff9d1d;
      }
    }
    span {
      margin-top: 10px;
      font-size: 12px;
      color: #333333;
    }
  }
}

.userinfo {
  margin-top: 10px;
}
:deep(.outBtn) {
  margin-top: 10px;
  .van-button {
    width: 100%;
    color: red;
    border: unset;
  }
}
</style>
