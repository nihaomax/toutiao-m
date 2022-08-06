<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="黑马头条" left-arrow @click-left="onClickLeft" />
  </div>
</template>

<script>
export default {
  methods: {
    onClickLeft() {
      this.$router.back()
    }
  }
}
</script>

<style></style>
