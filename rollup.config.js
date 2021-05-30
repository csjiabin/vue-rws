import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import { babel } from "@rollup/plugin-babel";
// import alias from "@rollup/plugin-alias";
// import serve from "rollup-plugin-serve";
const plugins = [
  json(),
  nodeResolve(),
  terser(),
  commonjs(),
  // babel(),
  // alias({
  //   entries: [
  //     { find: 'utils', replacement: '../../../utils' },
  //     { find: 'batman-1.0.0', replacement: './joker-1.5.0' }
  //   ]
  // })
  // serve("lib")
];

export default [
  {
    input: "src/index.js",
    output: [
      {
        name: "vue-rws",
        file: "./lib/vue-rws.common.js",
        format: "cjs",
      },
      {
        name: "VueRws",
        file: "./lib/vue-rws.umd.js",
        format: "umd",
      },
      {
        name: "vue-rws",
        file: "./lib/vue-rws.esm.js",
        format: "esm",
      },
      {
        name: "VueRws",
        file: "./lib/vue-rws.iife.js",
        format: "iife",
      },
    ],
    plugins,
  },
];
