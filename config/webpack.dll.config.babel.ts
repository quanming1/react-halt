import webpack from "webpack";
import { resolvePath } from "./helpers.babel";
import TerserPlugin from "terser-webpack-plugin";

const config: webpack.Configuration = {
  entry: {
    Vendor: ["react", "react-redux", "axios", "redux-persist"],
  },
  output: {
    path: resolvePath("../dll"),
    filename: "[name].dll.js",
    library: "[name]_library",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "thread-loader",
            options: { workers: 8 },
          },
          "babel-loader",
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({ parallel: true })],
  },
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,
      name: "[name]_library",
      path: resolvePath("../dll/[name]-manifest.json"),
    }),
  ],

  mode: "development",
};

export default config;
