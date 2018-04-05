// Helpers to grab assets provides by the gravity-ui-sass library
const fs = require("fs");
const gravity = require("@buildit/gravity-ui-sass");
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
    const svgSymbols = fs.readFileSync(gravity.bldSvgSymbolsFilePath, "utf8");
    handlebars.registerPartial(sygSymbolPartialName, svgSymbols);
  }
};
