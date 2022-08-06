<template>
  <div class="his">
    <van-cell title="搜索历史">
      <div v-if="isShowDel">
        <span>全部删除</span> &nbsp; &nbsp;
        <span @click="isShowDel = false">完成</span>
      </div>
      <van-icon name="delete-o" v-else @click="isShowDel = true" />
    </van-cell>

    <van-cell v-for="(item, index) in historyList" :key="index" :title="item">
      <van-icon name="close" v-if="isShowDel" />
    </van-cell>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowDel: false,
      historyList: this.$store.state.history
    }
  }
}
</script>

<style lang="less" scoped>
.his {
  padding: 108px 20px;
}
</style>
