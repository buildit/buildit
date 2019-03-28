const path = require("path");
const gulpIf = require("gulp-if");
const rollup = require("rollup");
const babel = require("rollup-plugin-babel");
const closure = require("rollup-plugin-closure-compiler-js");
const resolveNodeModules = require("rollup-plugin-node-resolve");
const paths = require("../config/gulp.json").paths;
const envs = require("./envs");
const getBuildInfo = require("./get-build-info.js");

const optimise = envs.shouldOptimise();

function bundle() {
  return getBuildInfo().then(bldInfo => {
    rollup
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
              rewritePolyfills: false,
              // Use Closure's outputWrapper to prepend build info
              // for optimised builds
              outputWrapper: `/* ${bldInfo.description} ${
                bldInfo.commitShortHash
              } */\n%output%`
            })
          )
        ]
      })
      .then(bundle => {
        return bundle.write({
          file: path.join(paths.scripts.dest, "bundle.min.js"),
          format: "umd",
          sourcemap: true,
          // For non-optimised builds
          // (this gets stripped off by closure otheriwse)
          banner: `/* ${bldInfo.description} ${bldInfo.commitShortHash} */`
        });
      });
  });
}

module.exports = {
  bundle
};
