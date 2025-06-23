import { Configuration } from "webpack";
import path from "path";
function resolve(dir: string) {
  return path.resolve(__dirname, dir);
}

const config: Configuration = {
  entry: "./src/index.ts",
  output: {
    filename: "index.js",
    path: resolve("dist"),
    clean: true,
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", "..."],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  mode: "production",
};

export default config;
