import path from "path";

function resolvePath(pathName) {
  return path.join(__dirname, pathName);
}
const sassResourceLoader = {
  loader: "sass-resources-loader",
  options: {
    resources: resolvePath("../src/Style/index.scss"),
  },
};

export { resolvePath, sassResourceLoader };
