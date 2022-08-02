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
        class="mychannel-item"
        v-for="value in 6"
        :key="value"
        text="文字"
      >
        <template #icon>
          <van-icon name="cross" v-show="isEdit" />
        </template>
      </van-grid-item>
    </van-grid>
    <!-- 推荐频道 -->
    <van-cell title="推荐频道"> </van-cell>
    <van-grid gutter="0.2rem">
      <van-grid-item
        class="recommend-item"
        icon="plus"
        v-for="value in 6"
        :key="value"
        text="文字"
      />
    </van-grid>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isEdit: false
    }
  }
}
</script>

<style lang="less" scoped>
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
