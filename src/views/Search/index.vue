<template>
  <div>
    <van-search
      v-model="search"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      clearable
      background="#3296fa"
    >
      <template #action>
        <div class="cancel" @click="onSearch">取消</div>
      </template>
    </van-search>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: ''
    }
  },
  methods: {
    onSearch() {
      this.$router.push('/ ')
    }
  }
}
</script>

<style lang="less" scoped>
.cancel {
  color: #fff;
}
</style>
