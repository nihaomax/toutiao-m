<template>
  <div class="searchResult">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell
        v-for="item in resultList"
        :key="item.art_id"
        :title="item.title"
        @click.native="$router.push('/article')"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResultApi } from '@/api'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      finished: false,
      error: false,
      resultList: [],
      page: 1,
      per_page: 20
    }
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getSearchResultApi({
          page: this.page,
          per_page: this.per_page,
          q: this.keywords
        })
        const result = data.data.results
        // 将每次请求的结果push到数组上去
        this.resultList.push(...result)
        this.loading = false
        // 当获取到数据的时候让页面++ 没有数据的时候显示没有更多了
        // 让每次的页面加1
        // 如果还有数据那么就让页数++
        if (result.length) {
          this.page++
        } else {
          // 如果没有那么就显示没有更多
          this.finished = true
        }

        // console.log(data)
      } catch (error) {
        // console.log(error)
        this.error = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.searchResult {
  padding: 108px 20px;
}
</style>
