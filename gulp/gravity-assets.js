// Helpers to grab assets provides by the gravity-ui-web library
const fs = require("fs");
const gravityPaths = require("@buildit/gravity-ui-web/build-api");
const sygSymbolPartialName = "gravity-svg-symbols";

module.exports = {
  sygSymbolPartialName,

  /**
   * Registers Gravity's SVG symbol definitions as a Handlebars
   * partial.
   *
   * This allows them to easily be inlined into the HTML output.
   *
   * @param {*} handlebars  The Handlebars instance to register the partial with.
   */
  registerSvgSymbolsAsPartial: function(handlebars) {
    const svgSymbols = fs.readFileSync(
      gravityPaths.distPath(gravityPaths.distSvgSymbolsFilename),
      "utf8"
    );
    handlebars.registerPartial(sygSymbolPartialName, svgSymbols);
  }
};
