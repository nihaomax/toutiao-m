<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="confirmFn"
      @cancel="cancelFn"
    />
  </div>
</template>

<script>
import moment from 'moment'
import { editUserProfileApi } from '@/api'
export default {
  props: {
    userInfoBirthday: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.userInfoBirthday)
    }
  },
  methods: {
    async confirmFn() {
      const date = moment(this.currentDate).format('YYYY-MM-DD')
      // console.log(date)
      try {
        await editUserProfileApi({
          birthday: date
        })
        this.$emit('change-birthday', date)
        this.$parent.$parent.isShowBirthday = false
        this.$toast.success('生日修改成功')
      } catch {
        this.$toast.fail('生日修改失败')
      }
    },
    cancelFn() {
      this.$parent.$parent.isShowBirthday = false
    }
  }
}
</script>

<style></style>
