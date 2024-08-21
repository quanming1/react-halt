import { resolvePath } from "./helpers.babel";
import merge from "webpack-merge";
import TsPathPlugin from "tsconfig-paths-webpack-plugin";
import DotEnv from "dotenv-webpack";
import { Configuration } from "webpack";
import SpeedMeasurePlugin from "speed-measure-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import path from "path";

const currentEnv = process.env.NODE_ENV as Configuration["mode"];
const config: Configuration = {
  entry: {
    main: resolvePath("../src/index"),
  },
  output: {
    path: resolvePath("../dist"),
    filename: "js/[name]-[contenthash:5].bundle.js",
    clean: true,
    chunkFilename: "js/chunks/[name]-[contenthash:5].chunk.js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".tsx", ".ts", "..."],
    plugins: [new TsPathPlugin({})],
  },
  module: {
    rules: [
      {
        exclude: [/node_modules/, /\.dll\.js/],
        test: /\.(js|jsx|ts|tsx)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.worker\.(ts|js)$/,
        use: [
          {
            loader: "worker-loader",
            options: {
              inline: "no-fallback",
            },
          },
          "babel-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 1024 * 8, // 小于8kb打包为dataURL
          },
        },
        generator: {
          filename: "img/[name]-[hash:5][ext]",
        },
      },
      {
        test: /\.(eot|ttf|otf|woff2?)$/,
        type: "asset",
        generator: {
          filename: "fonts/[name]-[hash:5][ext]",
        },
      },
    ],
  },
  plugins: [
    new DotEnv({
      path: resolvePath(`../env/.env.${currentEnv}`),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolvePath("../public/static"),
          to: resolvePath("../dist"),
        },
      ],
    }),
  ],
  cache: {
    type: "filesystem",
    buildDependencies: {
      config: [
        __filename,
        resolvePath("../postcss.config.js"),
        resolvePath("../tsconfig.json"),
        resolvePath("../.babelrc"),
      ],
    },
  },
  optimization: {
    minimize: true,
    minimizer: [new SpeedMeasurePlugin()],
    splitChunks: {
      minChunks: 2,
      minSize: 0,
      chunks: "all",
      cacheGroups: {
        Common: {
          priority: 1,
        },
        Vendor: {
          test: /node_modules/,
          priority: 10,
        },
      },
    },
    runtimeChunk: {
      name: (entryPoint) => `runtime~${entryPoint.name}.js`,
    },
  },
  performance: false,
  mode: currentEnv,
};

export default merge(
  config,
  currentEnv === "production"
    ? require("./webpack.prod.config.babel").default
    : require("./webpack.dev.config.babel").default,
);
