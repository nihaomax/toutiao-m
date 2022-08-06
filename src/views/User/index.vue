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
      <!-- v-if="isShowAvator"是让 UpdateAvator组件中的mounted中的this.init()多次调用-->
      <update-avator
        :photo="photo"
        v-if="isShowAvator"
        @update-avator="userInfo.photo = $event"
      ></update-avator>
    </van-popup>
  </div>
</template>

<script>
import { getUserInfoApi } from '@/api'
import UpdateAvator from './components/UpdateAvator.vue'
import { resolveToBase64 } from '@/utils'
export default {
  name: 'User',
  data() {
    return {
      userInfo: {},
      isShowAvator: false,
      photo: ''
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
    async selectPhoto(e) {
      // console.dir(e.target.files[0])
      // 1.获取用户选择的图片的文件对象
      // e.target 触发事件的元素
      // HTMLInputElement.files[0] 伪元素，存储的用户选择的图片
      const file = e.target.files[0]

      // 方法1
      // 2.把file文件对象处理成img标签可识别的url
      // window.URL.createObjectURL(file对象) 可以转换成img标签src可识别的格式
      // 这个方式会造成内存泄漏 是于document绑定一起 同生共死 你死我也死 你不死 我也不死

      // const url = window.URL.createObjectURL(file)

      // 方法2
      // FileReader window身上的内置属性 用于处理成base64的格式 readAsDataURL()
      // 先创建一个实例对象
      // const fr = new FileReader()
      // 使用这个对象身上的方法读取文件中的内容
      // fr.readAsDataURL(file)
      // 由于这个读取事件是异步的，所以需要用箭头函数去进行操作
      // fr.onload = (el) => {
      //   this.photo = el.target.result
      // }

      // 方法3 比较推荐 使用promise，让异步变成同步操作
      const url = await resolveToBase64(file)
      // 3.传递url
      this.photo = url
      // 4.清空value，让用户可以选择同一张图片
      e.target.value = ''
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
