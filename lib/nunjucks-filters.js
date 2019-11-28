const path = require('path');
const imageVariantNamingFn = require('./gulp-image-variants').defaultFilenameFn;

module.exports = {

  /**
   * Takes a path to an image file and parameters from the
   * `gulp-image-variants` plug-in and outputs the corresponding
   * image variant filename.
   */
  imgVariant: (str, variantName, sizeName, density) => {
    const parsed = path.parse(str);
    delete parsed.base; // Prevent base taking precedence over new name.
    parsed.name = imageVariantNamingFn(parsed.name, variantName, sizeName, density);
    return path.format(parsed);
  },

  /**
   * Takes a path to an image file and replaces the extension with .webp.
   *
   * E.g.: `{{ "foo.jpg" | webp }}` will render `foo.webp`.
   */
  webp: (str) => {
    const parsed = path.parse(str);
    delete parsed.base; // Prevent base taking precedence over new ext.
    parsed.ext = '.webp';
    return path.format(parsed);
  },
};
