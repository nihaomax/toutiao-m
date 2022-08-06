<template>
  <div class="his">
    <van-cell title="搜索历史">
      <div v-if="isShowDel">
        <span @click="delAllHistory">全部删除</span> &nbsp; &nbsp;
        <span @click="isShowDel = false">完成</span>
      </div>
      <van-icon name="delete-o" v-else @click="isShowDel = true" />
    </van-cell>

    <van-cell
      v-for="(item, index) in historyList"
      :key="index"
      :title="item"
      @click="clickFn(item)"
    >
      <van-icon
        name="close"
        v-if="isShowDel"
        @click="delSingleHistory(index)"
      />
    </van-cell>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowDel: false,
      historyList: this.$store.state.history || []
    }
  },
  methods: {
    // 单个删除
    delSingleHistory(index) {
      this.historyList.splice(index, 1)
      // console.log(this.historyList)
      this.$store.commit('SET_HISTORY', this.historyList)
    },
    // 全部删除
    delAllHistory() {
      this.historyList = []
      this.$store.commit('SET_HISTORY', [])
    },
    clickFn(val) {
      console.log(val)
      this.$parent.keywords = val
      this.$parent.onSearch()
    }
  }
}
</script>

<style lang="less" scoped>
.his {
  padding: 108px 20px;
}
</style>
