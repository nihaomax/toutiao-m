<template>
  <div>
    <van-picker
      title="更新性别"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="onCancel"
      @change="onChange"
      :default-index="infoSex"
    />
  </div>
</template>

<script>
import { editUserProfileApi } from '@/api'
export default {
  props: {
    userInfoSex: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      columns: ['男', '女'],
      infoSex: this.userInfoSex
    }
  },
  methods: {
    async onConfirm(value, index) {
      //   console.log(`当前值：${value}, 当前索引：${index}`)
      this.$toast.loading({
        message: '性别修改中...',
        forbidClick: true
      })
      try {
        const { data } = await editUserProfileApi({
          gender: this.infoSex
        })
        this.$emit('change-sex', this.infoSex)
        this.$parent.$parent.isShowSex = false
        this.$toast.success('性别修改成功')
      } catch {
        this.$toast.fail('性别修改失败')
      }
    },
    onChange(picker, value, index) {
      //   console.log(`当前值：${value}, 当前索引：${index}`)
      this.infoSex = index
      //   console.log(this.infoSex)
    },
    onCancel() {
      this.$parent.$parent.isShowSex = false
    }
  }
}
</script>

<style></style>
