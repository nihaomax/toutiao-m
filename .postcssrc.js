module.exports = {
  plugins: {
    'postcss-pxtorem': {
      // 根节点的rem大小
      // rootValue: 37.5,
      //   rootValue(module) {
      //     if (/vant/i.test(module.file)) {
      //       return 37.5
      //     } else {
      //       return 75
      //     }
      //   },

      rootValue: ({ file }) => (/vant/i.test(file) ? 37.5 : 75),
      propList: ['*']
    }
  }
}
