module.exports = {
  presets: [
    ["@babel/preset-env", { corejs: 3, useBuiltIns: "usage" }],
    ["@babel/preset-react", { runtime: "automatic" }],
    ["@babel/preset-typescript"],
  ],
  plugins: [
    [
      "@babel/transform-runtime",
      {
        helper: true,
        corejs: false,
      },
    ],
  ],
};
