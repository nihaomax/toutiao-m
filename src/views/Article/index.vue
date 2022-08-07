<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="黑马头条" left-arrow @click-left="onClickLeft" />
    <!-- 文章标题 -->
    <van-cell class="title" :title="articleList.title" />
    <!-- 头像关注部分 -->
    <van-cell :title="articleList.aut_name" :label="articleList.pubdate">
      <template #icon>
        <van-image
          class="img"
          round
          width="10rem"
          height="10rem"
          :src="articleList.aut_photo"
        />
      </template>
      <template>
        <van-button
          round
          type="default"
          size="mini"
          v-if="articleList.is_followed"
        >
          已关注
        </van-button>
        <van-button type="info" round size="mini" v-else @click="ClickFollowBtn"
          >+关注</van-button
        >
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getArticleListApi, followUsersApi } from '@/api'
export default {
  name: 'Article',
  data() {
    return {
      articleList: []
    }
  },
  created() {
    console.log(this.$route.query.artId)
    this.getArticleList()
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    async getArticleList() {
      try {
        const id = this.$route.query.artId
        const { data } = await getArticleListApi(id)
        this.articleList = data.data
        console.log(data)
      } catch (e) {
        console.log(e)
      }
    },
    async ClickFollowBtn() {
      try {
        const id = this.$route.query.artId
        const { data } = await followUsersApi({
          target: id
        })
        console.log(data)
      } catch {
        this.$toast.fail('关注用户失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  .van-cell__title {
    font-size: 0.53333rem;
    padding: 25px 10px;
    margin: 0;
    color: #3a3a3a;
    font-weight: 700;
  }
}
:deep(.van-image) {
  width: 65px !important;
  height: 65px !important;
  margin-right: 10px;
  line-height: 65px;
}

:deep(.van-button) {
  &.van-button--mini {
    width: 2.13333rem !important;
  }
}
</style>
