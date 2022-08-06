<template>
  <div class="nickName">
    <van-nav-bar
      class="navBar"
      title="更新昵称"
      left-text="取消"
      right-text="保存"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-field
      v-model="isNickName"
      placeholder="请输入新的昵称"
      maxlength="11"
      show-word-limit
    />
  </div>
</template>

<script>
import { editUserProfileApi } from '@/api'
export default {
  props: {
    userInfoName: {
      type: String || Number,
      required: true
    }
  },
  data() {
    return {
      isNickName: this.userInfoName
    }
  },
  methods: {
    onClickLeft() {
      this.$parent.$parent.isShowNickName = false
    },
    async onClickRight() {
      this.$toast.loading({
        message: '昵称修改中...',
        forbidClick: true
      })
      try {
        const { data } = await editUserProfileApi({
          name: this.isNickName
        })
        this.$emit('change-Name', this.isNickName)
        // console.log(data)
        this.$parent.$parent.isShowNickName = false
        this.$toast.success('昵称修改成功')
      } catch (e) {
        console.log(e)
        this.$toast.fail('昵称修改失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.nickName {
  :deep(.navBar) {
    background-color: #fff !important;
  }
  :deep(.van-nav-bar__title) {
    color: #000 !important;
  }
  :deep(.van-icon) {
    color: #3296fa !important;
  }
}
</style>
