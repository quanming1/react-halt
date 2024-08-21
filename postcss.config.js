module.exports = {
  plugins: [
    "autoprefixer",
    [
      "postcss-pxtorem",
      {
        rootValue: 54, // 同html的fount-size大小，
        unitPrecision: 4, // 转换成rem后保留小数点后2位
        propList: ["*"], // 需要转换的css元素
        selectorBlackList: [],
        replace: true,
        mediaQuery: false,
        minPixelValue: 0,
        exclude: /node_modules/i,
      },
    ],
  ],
  presets: ["postcss-preset-env"],
};
