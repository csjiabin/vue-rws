const path = require("path");
function resolve(dir) {
  return path.resolve(__dirname, dir);
}
module.exports = {
  productionSourceMap: false,
  pages: {
    index: {
      entry: "example/main.js",
      template: "public/index.html",
      filename: "index.html",
    },
  },
  css: {
    extract: false,
  },
  configureWebpack: {
    resolve: {
      extensions: [".js", ".vue", ".json"],
      alias: {
        "vue-rws": resolve("packages"),
      },
    },
    output: { libraryExport: "default" },
  },
};
