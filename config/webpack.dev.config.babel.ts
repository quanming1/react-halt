import { sassResourceLoader, resolvePath } from "./helpers.babel";
import webpack from "webpack";
import AddAssetPlugin from "add-asset-html-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";

const config: webpack.Configuration = {
  devtool: "source-map",
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.module\.(css|scss)$/,
            use: [
              "style-loader",
              {
                loader: "css-loader",
                options: {
                  modules: {
                    localIdentName: "[name]__[local]__[hash:base64:5]",
                  },
                  sourceMap: true, // 仅在开发环境中启用
                },
              },
              "postcss-loader",
              "sass-loader",
              sassResourceLoader,
            ],
          },
          {
            test: /\.(css|scss)$/,
            exclude: /\.module\.(css|scss)$/,
            use: [
              "style-loader",
              "css-loader",
              "postcss-loader",
              "sass-loader",
              sassResourceLoader,
            ],
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolvePath("../public/index.html"),
    }),
    new AddAssetPlugin({
      filepath: resolvePath("../dll/Vendor.dll.js"),
      publicPath: "/dll",
      outputPath: "dll",
      typeOfAsset: "js", // 自动添加defer
    }),
    new webpack.DllReferencePlugin({
      manifest: resolvePath("../dll/Vendor-manifest.json"),
    }),

    new ReactRefreshWebpackPlugin(),
  ],
  // @ts-ignore
  devServer: {
    static: {
      directory: resolvePath("../dist"),
      publicPath: "/",
    },
    port: 8765,
    hot: true,
    historyApiFallback: true,
  },
};

export default config;
