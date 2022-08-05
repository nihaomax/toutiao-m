<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="个人信息" left-arrow @click-left="$router.back()" />
    <!-- 用户信息 -->
    <!-- 头像部分 -->
    <van-cell title="单元格" is-link @click="$refs.file.click()">
      <van-image
        round
        fit="cover"
        width="0.8rem"
        height="0.8rem"
        :src="userInfo.photo"
      />
      <!-- 用户选择文件的表单 -->
      <!-- input type="file"的属性 -->
      <!-- accept：显示file选择的文件后缀名规定用户只能上传什么格式的图片，hidden：隐藏input：file -->
      <input
        type="file"
        hidden
        accept=".png,.jfif"
        ref="file"
        @change="selectPhoto"
      />
    </van-cell>
    <!-- 用户头像弹出层 -->
    <van-popup
      class="avator-popup"
      v-model="isShowAvator"
      position="bottom"
      :style="{ height: '100%', watch: '100%' }"
      closeable
    >
      <update-avator></update-avator>
    </van-popup>
  </div>
</template>

<script>
import { getUserInfoApi } from '@/api'
import UpdateAvator from './components/UpdateAvator.vue'
export default {
  name: 'User',
  data() {
    return {
      userInfo: {},
      isShowAvator: false
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      try {
        const { data } = await getUserInfoApi()
        this.userInfo = data.data
        // console.log(data)
      } catch (error) {
        this.$toast.fail('获取用户信息失败，请刷新')
      }
    },
    // 用户选择了图片
    selectPhoto() {
      // 选择图片后弹出弹窗
      this.isShowAvator = true
    }
  },
  components: {
    UpdateAvator
  }
}
</script>

<style lang="less" scoped>
:deep(.van-nav-bar) {
  background-color: #3296fa;
  .van-nav-bar__title {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
.avator-popup {
  background-color: #000;
}
</style>
