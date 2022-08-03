<template>
  <div class="channel">
    <!-- 我的频道 -->
    <van-cell title="我的频道">
      <van-button
        class="edit-btn"
        round
        size="small"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid gutter="0.2rem">
      <van-grid-item
        v-for="(item, index) in myChannels"
        :key="item.id"
        :text="item.name"
        :class="['mychannel-item', { active: item.name === '推荐' }]"
        @click="changeActive(index, item)"
      >
        <template #icon>
          <!-- 当内容不是推荐的时候显示叉号 -->
          <van-icon name="cross" v-show="isEdit && item.name !== '推荐'" />
        </template>
      </van-grid-item>
    </van-grid>
    <!-- 推荐频道 -->
    <van-cell title="推荐频道"> </van-cell>
    <van-grid gutter="0.2rem">
      <van-grid-item
        class="recommend-item"
        icon="plus"
        v-for="item in recommendChannels"
        :key="item.id"
        :text="item.name"
        @click="$emit('add-channel', item)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannelApi } from '@/api'

export default {
  props: {
    myChannels: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isEdit: false,
      allChannels: []
    }
  },
  created() {
    this.getAllChannel()
  },
  methods: {
    async getAllChannel() {
      try {
        const { data } = await getAllChannelApi()
        this.allChannels = data.data.channels
        console.log(data)
      } catch (e) {
        console.log(e)
      }
    },
    // 改变tab的active
    //  this.$parent:当前组件实例的亲身父亲实例
    changeActive(index, item) {
      // 处于编辑状态
      if (this.isEdit) {
        if (item.name === '推荐') return
        // 删除我的频道
        this.$emit('del-channel', item.id)
      } else {
        // 1.关闭弹窗
        this.$parent.$parent.show = false
        // 2.切换tab active
        this.$emit('change-active', index)
      }
    }
  },
  // filter 返回的值：新数组
  // return true 将遍历到的哪一项加入到新数组里面
  // find 从数组当中查找满足条件的元素
  //  返回值 如果查找到返回元素 如果没有查找找返回undifined
  computed: {
    // const results = !!this.myChannels.find(( mitem) => aitem.id === mitem.id)
    // if (results) {
    //   return false
    // } else {
    //   return true
    // }
    recommendChannels() {
      return this.allChannels.filter(
        (aitem) => !this.myChannels.find((mitem) => aitem.id === mitem.id)
      )
    }
  }
}
</script>

<style lang="less" scoped>
.active {
  :deep(.van-grid-item__text) {
    color: red;
  }
}
.channel {
  padding-top: 1.33333rem;
  .edit-btn {
    width: 104px;
    height: 48px;
    color: red;
    border-color: red;
  }

  :deep(.van-grid-item__content) {
    background-color: #eee;
  }
  .recommend-item {
    :deep(.van-grid-item__content) {
      flex-direction: row;
      //   align-content: center;
    }
    :deep(.van-grid-item__icon) {
      font-size: 40px;
    }
    :deep(.van-grid-item__icon + .van-grid-item__text) {
      margin-top: 2px;
    }
  }
  :deep(.mychannel-item) {
    .van-grid-item__content {
      position: relative;
    }
    .van-grid-item__icon-wrapper {
      position: unset;
    }
    .van-icon-cross {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 30px;
      transform: translate(35%, -45%);
      border: 2px solid #000;
      border-radius: 50%;
      z-index: 300;
    }
  }
}
</style>
