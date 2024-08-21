import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { sassResourceLoader, resolvePath } from "./helpers.babel";
import CssMini from "css-minimizer-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CompressPlugin from "compression-webpack-plugin";

export default {
  devtool: false,
  externals: {
    react: "React",
    axios: "axios",
    "react-redux": "ReactRedux",
    "pixi.js": "PIXI",
    "redux-persist": "ReduxPersist",
  },
  module: {
    rules: [
      {
        test: /\.module\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[hash:base64:12]",
              },
              sourceMap: false,
            },
          },
          "postcss-loader",
          "sass-loader",
          sassResourceLoader,
        ],
      },
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
          sassResourceLoader,
        ],
        exclude: /\.module\.(css|scss)$/,
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: 12,
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
          mangle: true,
          toplevel: true,
          keep_fnames: true,
        },
      }),
      new CssMini({
        parallel: 12,
      }),
      new CompressPlugin({
        filename: "[name].gz[query]",
        minRatio: 0.8,
        threshold: 10240, // 大于10kb的才被压缩
        compressionOptions: {},
        test: /\.(js|json|html)(\?.*)?$/i,
        deleteOriginalAssets: true, // 删除源文件
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name]-[contenthash:5].css",
    }),
    new HtmlWebpackPlugin({
      template: resolvePath("../public/index.prod.html"),
      name: "index.html",
    }),
    // new BundleAnalyzerPlugin({
    //     analyzerMode: 'static', // 默认值：server，共有server，static，json，disabled四种模式
    //     reportFilename: 'report.html', // 默认值：report.html，在static模式下生成的捆绑报告文件的路径名
    //     openAnalyzer: true, // 默认值：true，是否在默认浏览器中自动打开报告
    // }),
  ],
};
