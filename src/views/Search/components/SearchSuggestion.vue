<template>
  <div>
    <van-cell
      v-for="(item, index) in highlightSuggestions"
      :key="index"
      icon="search"
    >
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggetionsApi } from '@/api'
import { debounce } from 'lodash'
// 1.动态正则
// - 字面量 /aasdasd/ig
// - new RegExp(变量，'ig')

// 2.字符串的replace
// 'Auglar'.replace(/a/ig,function(match){
//   return `<span>${match}</span>`
// })
// '<span>A</span>ugl<span>a</span>r'
// 1.第一个参数可以是正则
// 2.第二个参数可以是函数，函数的返回值是要替换的字符串
// 3.match:正则匹配上的字符
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggetions: [],
      timer: null
    }
  },
  methods: {
    // 获取搜索建议
    // 防抖
    // getSearchSuggetions() {
    //   // 干掉上一次的定时器
    //   clearTimeout(this.timer)
    //   //   1、延迟执行
    //   this.timer = setTimeout(async () => {
    //     try {
    //       const { data } = await getSearchSuggetionsApi(this.keywords)
    //       console.log(data)
    //       this.suggetions = data.data.options
    //     } catch {
    //       // console.log(e)
    //       this.$toast.fail('获取搜索建议失败')
    //     }
    //   }, 300)
    // }
    // 处理搜索建议+防抖
    // 单一职责原则
    getSearchSuggetions: debounce(async function () {
      try {
        const { data } = await getSearchSuggetionsApi(this.keywords)
        console.log(data)
        // Boolean()是window的方法 如果传进去的是真值则返回true，如果传的是假值返回的是false
        // this.suggetions = data.data.options.filter((str) => Boolean(str))
        this.suggetions = data.data.options.filter(Boolean)
      } catch {
        // console.log(e)
        this.$toast.fail('获取搜索建议失败')
      }
    }, 300)
  },
  // 先有组件，才能监听keywords的变化
  watch: {
    keywords: {
      // 让页面渲染的时候就开始监听keywords
      immediate: true,
      handler() {
        this.getSearchSuggetions()
      }
    }
  },
  computed: {
    highlightSuggestions() {
      // map:映射 返回一个新数组，新数组的长度和原数组一样 不会改变原数组 要return 不return返回undefined
      // gi全局匹配 忽略大小写
      const reg = new RegExp(this.keywords, 'gi')
      //   return this.suggetions.map((item) => {
      //     return item.replace(reg, (match) => {
      //       return `<span style="color:red">${match}</span>`
      //     })
      //   })
      return this.suggetions.map((item) =>
        item.replace(reg, (match) => `<span style="color:red">${match}</span>`)
      )
    }
  }
}
</script>

<style></style>
