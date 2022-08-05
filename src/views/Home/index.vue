<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button round class="search-btn" icon="search" to="search"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <!-- 文章 -->
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in myChannels" :key="item.id" :title="item.name">
        <article-list :id="item.id"></article-list>
      </van-tab>

      <span class="toutiao toutiao-gengduo1" @click="show = true"></span>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
    >
      <!-- $event 模板 原生事件：事件对象  -->
      <!-- 自定义事件当中：子组件传递过来的第一个参数 -->
      <channel-popup
        :myChannels="myChannels"
        @change-active="active = $event"
        @del-channel="delChannel"
        @add-channel="addChannel"
      ></channel-popup>
    </van-popup>
  </div>
</template>

<script>
import {
  getMyChannel as getMyChannelApi,
  delMyChannelApi,
  addMyChannelApi,
  setMyChannelsToLocal,
  getMyChannelsByLocal
} from '@/api'
import ArticleList from './components/ArticleList.vue'
import ChannelPopup from './components/ChannelPopup.vue'
export default {
  name: 'Home',
  data() {
    return {
      active: 0,
      myChannels: [],
      show: false
    }
  },
  created() {
    this.initMyChannels()
  },
  methods: {
    // 初始化myChannels数据
    initMyChannels() {
      // 如果用户登录了
      if (this.isLogin) {
        // 发送请求获取myChannels数据
        this.getMyChannel()
      } else {
        // 如果用户没有登陆
        const myChannels = getMyChannelsByLocal()
        // 本地存储有myChannels数据，从本地拿myChannels
        if (myChannels) {
          this.myChannels = myChannels
        } else {
          // 本地存储没有myChannels数据，获取默认的myChannels
          this.getMyChannel()
        }
      }
    },
    // 获取频道导航列表
    // 如果用户登录了，获取的是用户自己的myChannels
    // 如果没有登录，获取的是默认的myChannels
    async getMyChannel() {
      try {
        const { data } = await getMyChannelApi()
        this.myChannels = data.data.channels
        // console.log(data)
      } catch (error) {
        console.dir(error)
        this.$toast.fail('获取频道失败，请重新刷新')
      }
    },
    // 删除频道
    async delChannel(id) {
      this.$toast.loading({
        message: '正在删除频道...',
        forbidClick: true
      })
      try {
        const newChannels = this.myChannels.filter((item) => item.id !== id)
        // 如果是用户是登录状态 就执行if里面的  如果未登录执行else 在本地存储数据
        if (this.isLogin) {
          // 删除服务器的数据
          await delMyChannelApi(id)
        } else {
          setMyChannelsToLocal(newChannels)
        }

        // 删除页面上的数据
        this.myChannels = newChannels
        this.$toast.success('频道删除成功')
      } catch {
        this.$toast.fail('频道删除失败')
      }
    },
    // 添加频道
    async addChannel(channel) {
      this.$toast.loading({
        message: '正在添加频道...',
        forbidClick: true
      })
      try {
        // 如果用户是登录状态，那就直接执行if里面的语句， 如果未登录 将数据存储到本地内
        if (this.isLogin) {
          // console.log('被触发了', channel)
          await addMyChannelApi(channel.id, this.myChannels.length)
        } else {
          // es6新语法 前面是旧的数据 后面是新添加进去的数据
          setMyChannelsToLocal([...this.myChannels, channel])
        }

        // 把点击的那个对象加入到myChannels 渲染到页面上去
        this.myChannels.push(channel)
        this.$toast.success('频道添加成功')
      } catch {
        this.$toast.fail('频道添加失败')
      }
    }
  },
  computed: {
    // 用于标识是否登录
    isLogin() {
      return !!this.$store.state.tokenObj.token
    }
  },
  components: {
    ArticleList,
    ChannelPopup
  }
}
</script>

<style lang="less" scoped>
.navbar {
  background-color: #3296fa;
  position: sticky;
  left: 0;
  top: 0;
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }

  :deep(.van-icon) {
    color: #fff;
  }
}

.search-btn {
  width: 7.4rem;
  height: 0.85333rem;
  background-color: #5babfb;
  color: #fff;

  &.van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}

/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;
  position: sticky;
  top: 92px;
  left: 0;
  z-index: 99;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo1 {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;
  z-index: 999;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
:deep(.van-tabs__content) {
  // 符号的两侧必须由空格
  max-height: calc(100vh - 92px - 88px - 100px);
  padding-bottom: 100px;
  overflow: auto;
}
</style>
