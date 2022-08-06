<template>
  <div>
    <!-- 搜索部分 -->
    <!-- form的作用：在ios系统下可以显示搜索按钮 -->
    <form action="/">
      <van-search
        v-model.trim="keywords"
        show-action
        placeholder="请输入搜索关键词"
        @cancel="onCancel"
        @search="onSearch"
        @focus="onSearchFocus"
        clearable
        background="#3296fa"
        class="search"
      />
    </form>
    <!-- <search-suggestion></search-suggestion>
    <search-result></search-result>
    <search-history></search-history> -->
    <!-- is指定动态组件的名字，字符串，并且名字应该从components里面取 -->

    <component
      :is="componentName"
      :keywords="keywords"
      :historyList="historyList"
      @searchFn="onSearch"
    ></component>
  </div>
</template>

<script>
import SearchSuggestion from './components/SearchSuggestion.vue'
import SearchResult from './components/SearchResult.vue'
import SearchHistory from './components/SearchHistory.vue'

export default {
  name: 'Search',
  data() {
    return {
      keywords: '',
      // 用于记录用户是否搜索了
      isShowSearchResult: false,
      historyList: this.$store.state.history
    }
  },
  methods: {
    onSearch() {
      // 解决敲击空格渲染到历史列表
      if (this.keywords.trim().length === 0) {
        return
      }
      if (this.historyList.indexOf(this.keywords) === -1) {
        // console.log(this.keywords)
        // 如果keywords不为空的时候那么就将搜索历史推到历史记录的数组里面
        this.historyList.unshift(this.keywords)
        // console.log(this.historyList)
        this.$store.commit('SET_HISTORY', this.historyList)
      }

      // console.log(this.historyList)
      // 用户搜索了，把isShowSearchResult改成true显示搜索结果
      this.isShowSearchResult = true
    },
    onCancel() {
      this.$router.back()
    },
    // 当用户聚焦了搜索框
    onSearchFocus() {
      // 如果keywords为'' 显示搜索历史
      // 如果keywords有值 ， 显示搜索建议
      // 当搜索框获取焦点的时候，那么搜索结果框不能出现，所以将isShowSearchResult改成false
      this.isShowSearchResult = false
    }
  },
  computed: {
    componentName() {
      // 如果输入的是空的字符串那么渲染的是搜索历史
      if (this.keywords === '') {
        return 'SearchHistory'
      }
      if (this.isShowSearchResult) {
        // 当isShowSearchResult为true的时候，说明用户按下搜索键，那么渲染搜索结果
        return 'SearchResult'
      }
      // 既不现实搜索历史，也不显示搜索结果
      return 'SearchSuggestion'
    }
  },
  components: {
    SearchSuggestion,
    SearchResult,
    SearchHistory
  }
}
</script>

<style lang="less" scoped>
.search {
  [role='button'] {
    color: #fff;
    background-color: transparent;
  }

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 66;
}
</style>
