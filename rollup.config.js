import path from "path";
import json from "@rollup/plugin-json";
import node from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import { babel } from "@rollup/plugin-babel";
import flow from "rollup-plugin-flow-no-whitespace";
import replace from "@rollup/plugin-replace";
import buble from "@rollup/plugin-buble";
import filesize from "rollup-plugin-filesize";
import alias from "@rollup/plugin-alias";
// import serve from "rollup-plugin-serve";
import pack from "./package.json";
const resolve = (p) => path.resolve(__dirname, p);

const version = process.env.VERSION || pack.version;
const banner =
  "/*!\n" +
  ` * vue-rws v${version}\n` +
  ` * (c) 2021-${new Date().getFullYear()} Evan You\n` +
  " * Released under the MIT License.\n" +
  " */";
const plugins = [
  json(),
  terser({
    output: {
      ascii_only: true, // 仅输出ascii字符
    },
    compress: {
      pure_funcs: ["console.log"], // 去掉console.log函数
    },
  }),
  flow(),
  node(),
  replace({
    preventAssignment: true,
    values: {
      __VERSION__: version,
      "process.env.NODE_ENV": process.env.NODE_ENV,
    },
  }),
  babel(),
  buble(),
  filesize(),
  alias({
    "@": resolve("src"),
    "vue-rws": resolve("src"),
  }),
  // serve(resolve("example")),
];

export default [
  {
    input: "src/index.js",
    output: {
      exports: "auto",
      name: "VueRws",
      file: "./lib/vue-rws.common.js",
      format: "cjs",
      banner,
    },
    plugins,
  },
  {
    input: "src/index.js",
    output: {
      exports: "auto",
      name: "VueRws",
      file: "./lib/vue-rws.umd.js",
      format: "umd",
      banner,
      env: "production",
    },
    plugins: [...plugins, commonjs()],
  },
  {
    input: "src/index.js",
    output: {
      exports: "auto",
      name: "VueRws",
      file: "./lib/vue-rws.esm.js",
      format: "esm",
      banner,
    },
    plugins,
  },
  {
    input: "src/index.js",
    output: {
      exports: "auto",
      name: "VueRws",
      file: "./lib/vue-rws.iife.js",
      format: "iife",
      banner,
    },
    plugins,
  },
];
