<template>
  <!-- 每一篇文章 -->
  <!-- 没有图片的时候显示 -->
  <van-cell
    v-if="articleInfo.cover.type === 0"
    :title="articleInfo.title"
    :label="label"
  />
  <!-- 一张图片显示 -->
  <van-cell
    v-else-if="articleInfo.cover.type === 1"
    :title="articleInfo.title"
    :label="label"
  >
    <van-image width="100" height="100" :src="articleInfo.cover.images[0]" />
  </van-cell>
  <!-- 三张图片的时候显示 -->
  <van-cell v-else :title="articleInfo.title" value="内容" :label="label">
    <div class="img">
      <van-image
        v-for="(item, index) in articleInfo.cover.images"
        :key="index"
        width="100"
        height="100"
        :src="item"
      />
    </div>
  </van-cell>
</template>

<script>
export default {
  props: {
    articleInfo: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    // label() {
    //   const art = this.articleInfo
    //   return `${art.aut_name} ${art.comm_count}评论 ${art.pubdate}`
    // }
    label() {
      const a = this.articleInfo
      // 获取的时间间隔
      const b = +new Date() - +new Date(a.pubdate)
      // 将获取的时间间隔变成年份
      const year = Math.floor(b / 1000 / 60 / 60 / 24 / 365)
      return `${a.aut_name} ${a.comm_count}评论  ${year}年前`
    }
  }
}
</script>

<style lang="less" scoped>
.img {
  display: flex;
}
</style>
