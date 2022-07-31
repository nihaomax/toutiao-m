<template>
  <div>
    <!-- 头部区域 -->
    <header>
      <div class="login" v-if="isLogin">登录后的盒子</div>
      <div class="logout" v-else>登录前的盒子</div>
    </header>
    <!-- 中间区域 -->
    <main>收藏、历史、消息通知、小智同学</main>
    <!-- 底部退出区域 -->
    <footer>
      <button v-if="isLogin" @click="logout">退出</button>
    </footer>
  </div>
</template>

<script>
export default {
  computed: {
    isLogin() {
      // !!转成布尔值
      return !!this.$store.state.tokenObj.token
    }
  },
  methods: {
    logout() {
      this.$store.commit('SET_TOKEN', {})
    }
  }
}
</script>

<style></style>
