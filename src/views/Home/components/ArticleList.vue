<template>
  <div>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="getNextPageArticle"
      success-text="文章加载成功"
    >
      <van-list
        v-model="loading"
        @load="getNextPageArticle"
        offset="0"
        :immediate-check="false"
        :finished="isFinished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <article-item
          v-for="item in articles"
          :key="item.art_id"
          :articleInfo="item"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from '@/components/ArticleItem.vue'
import { getArticleApi } from '@/api'
export default {
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      articles: [],
      pre_timestamp: '',
      // loading为false的时候 可以触发load事件 loading为true不可以触发load
      // 触发load事件自动将loading设置true
      loading: false,
      isFinished: false,
      error: false,
      refreshing: false
    }
  },
  created() {
    this.getFirstPageArticle()
  },
  methods: {
    // 获取第一页数据
    async getFirstPageArticle() {
      try {
        const { data } = await getArticleApi(this.id, +new Date())
        this.articles = data.data.results
        // 保存下一页的时间戳
        this.pre_timestamp = data.data.pre_timestamp
        // console.log(data)
      } catch (e) {
        // 提示刷新重新获取
        this.$toast.fail('请刷新重新获取文章')
      }
    },
    // 加载下一页文章
    async getNextPageArticle() {
      try {
        // 这里是模拟错误，要写在try里面
        // if (Math.random() < 0.5) {
        //   console.log(a)
        // }
        // console.log('加载下一页文章')
        const { data } = await getArticleApi(this.id, this.pre_timestamp)
        const timestamp = data.data.pre_timestamp
        const results = data.data.results
        // 判断是否加载完成
        // 当timestamp为null的时候声明下一页没有文章了
        if (timestamp === null) {
          this.isFinished = true
        }

        if (this.refreshing) {
          // 如果下拉刷新成功，那么我们就把下一页请求的数据放在最前面
          this.articles.unshift(...results)
        } else {
          // 将获取来的数据保存到articles，因为获取来的值是对象，所以要...data.data.results
          this.articles.push(...results)
        }

        // 更新时间戳，因为每次请求的时候时间戳是不一样的，所以要重新赋值改成新的，不重新赋值返回的数据永远是之前的哪一个数据，会报错
        this.pre_timestamp = timestamp

        console.log(data)
      } catch {
        this.error = true
      } finally {
        // finally无论是走try还是catch 都会执行finally内的代码
        // 要将loading重新设置为false 触发load事件
        this.loading = false
        // 下拉刷新成功后将refreshing重新设置为false
        this.refreshing = false
      }
    }
  },
  components: {
    ArticleItem
  }
}
</script>

<style></style>
