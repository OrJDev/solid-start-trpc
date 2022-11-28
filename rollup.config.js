import babel from "@rollup/plugin-babel";
import nodeResolve from "@rollup/plugin-node-resolve";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "es",
    },
  ],
  external: ["solid-js", "solid-js/web", "solid-start"],
  plugins: [
    nodeResolve({
      extensions: [".js", ".ts", ".tsx"],
    }),
    babel({
      extensions: [".js", ".ts", ".tsx"],
      babelHelpers: "bundled",
      presets: ["solid", "@babel/preset-typescript"],
      exclude: "node_modules/**",
    }),
  ],
};
