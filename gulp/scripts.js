const path = require("path");
const gulp = require("gulp");
const gulpIf = require("gulp-if");
const rollup = require("rollup");
const babel = require("rollup-plugin-babel");
const closure = require("rollup-plugin-closure-compiler-js");
const resolveNodeModules = require("rollup-plugin-node-resolve");
const paths = require("../config.json").paths;
const envs = require("./envs");

const optimise = envs.shouldOptimise();

function bundle() {
  return rollup
    .rollup({
      input: paths.scripts.main,
      plugins: [
        babel(),
        resolveNodeModules(),
        gulpIf(
          optimise,
          closure({
            compilationLevel: "SIMPLE",
            // ES6 transpilation is made from babel
            languageIn: "ECMASCRIPT5_STRICT",
            languageOut: "ECMASCRIPT5_STRICT",
            env: "CUSTOM",
            warningLevel: "QUIET",
            applyInputSourceMaps: false,
            useTypesForOptimization: false,
            processCommonJsModules: false,
            // babel takes care of this
            rewritePolyfills: false
          })
        )
      ]
    })
    .then(bundle => {
      return bundle.write({
        file: path.join(paths.scripts.dest, "bundle.min.js"),
        format: "umd",
        sourcemap: true
      });
    });
}

module.exports = {
  bundle
};
