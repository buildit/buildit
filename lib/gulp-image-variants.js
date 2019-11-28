/**
 * Gulp plug-in that creates scaled and cropped variants of the input images.
 *
 * The orignal image is passed through unchanced, but its variants are added to
 * the output.
 */

const through = require('through2');
const debug = require('debug')('gulp-image-variants');
const sharp = require('sharp');
const micromatch = require('micromatch');

// Extensions of supported image formats.
//
// This is the formats Sharp supports, with SVG
// excluded since SVGs are vectors and thus don't
// need resizing or cropping to reduce size.
//
// (See Sharp's docs for which formats it supports:
// http://sharp.pixelplumbing.com/)
const supportedFiletypes = [
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.tif',
  '.tiff',
  '.gif',
];

/**
 * Calls the async callback function using await for each
 * item in the array.
 *
 * We need to do some async stuff while iterating over arrays,
 * so can't use the vanilla Array.forEach().
 *
 * See: https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
 *
 * @param {*} array
 * @param {*} callback
 */
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index += 1) {
    // eslint-disable-next-line no-await-in-loop
    await callback(array[index], index, array);
  }
}


/**
 * Genrates a new file stem for an image variant.
 *
 * Basically appends the variant name, size name and
 * density to the file stem.
 *
 * @param {string} fileStem      The file stem, i.e. filename without the file extension.
 * @param {string} variantName   The name of the variant.
 * @param {string} sizeName      The name of the size.
 * @param {number} density       The pixel density multiplier.
 *
 * @return {string} The new file stem for this image variant.
 */
function updateFilestem(fileStem, variantName, sizeName, density) {
  return `${fileStem}_${variantName}-${sizeName}-${density}x`;
}

/**
 * Checks if the given length spec is an explicit length value.
 *
 * @param {object|number|undefined} lengthSpec
 */
function isExplicitLength(lengthSpec) {
  return typeof lengthSpec === 'number';
}

/**
 * Clamps length to the min and/or max values given.
 *
 * @param {number} length                 The initial length.
 * @param {object|undefined} minAndOrMax  Object with `min` and/or
 *                                `max` properties. If `undefined`
 *                                the original length will be returned.
 *
 * @return {number} The clamped length.
 */
function clampLength(length, minAndOrMax) {
  if (typeof minAndOrMax === 'object') {
    if (minAndOrMax.min !== undefined && length < minAndOrMax.min) {
      return minAndOrMax.min;
    }
    if (minAndOrMax.max !== undefined && length > minAndOrMax.max) {
      return minAndOrMax.max;
    }
  }
  return length;
}

/**
 * Calculates the new size of an image based on the given size spec and
 * density.
 *
 * If the spec specifies both with and height, those values will be used
 * and multiplied by the density. If only one dimension is given in the
 * spec, then the other will be calculated to preserve the original image's
 * aspect ratio (given by its metadata).
 *
 * @param {object} imageMeta   Sharp image metadata object.
 * @param {object} sizeSpec    Object with the desired `width` and/or `height`.
 * @param {number} density     The pixel density multiplier.
 *
 * @return {object} Object with the calculated `width` and `height`.
 */
function calculateImageSize(imageMeta, sizeSpec, density) {
  const originalAspectRatio = imageMeta.width / imageMeta.height;

  // Get or calculate target width & height
  const newWidth = isExplicitLength(sizeSpec.width)
    ? sizeSpec.width
    : clampLength(sizeSpec.height * originalAspectRatio, sizeSpec.width);
  const newHeight = isExplicitLength(sizeSpec.height)
    ? sizeSpec.height
    : clampLength(sizeSpec.width / originalAspectRatio, sizeSpec.height);

  return {
    width: Math.floor(newWidth * density),
    height: Math.floor(newHeight * density),
  };
}

/**
 * Creates a new image Vinyl file objects for the given size
 * and set of densities.
 *
 * The supplied original file will be cloned and then resized,
 * cropped and renamed as needed, and then returned.
 *
 * The original file is not modified.
 *
 * @param {Vinyl} originalFile   The original image file object.
 * @param {string} variantName   The name of the variant
 * @param {string} sizeName      The name of the size.
 * @param {object} sizeSpec      Object with the desired `width` and/or `height`.
 * @param {number} density       The pixel density multiplier.
 *
 * @return {Vinyl}  A new image file object, containing the
 *            resized, cropped and renamed sub-variant.
 */
async function createDensities(originalFile, variantName, sizeName, sizeSpec, density) {
  // Make a copy of the file
  const file = originalFile.clone();
  // Update the filename
  file.stem = updateFilestem(file.stem, variantName, sizeName, density);

  // Do resizing & cropping
  if (file.isBuffer()) {
    if (!isExplicitLength(sizeSpec.width) && !isExplicitLength(sizeSpec.height)) {
      throw new Error(`Size "${sizeName}" does not specify explicit width and/or height params. At least one must be present`);
    }

    const sharpImage = sharp(file.contents);
    const imageMeta = await sharpImage.metadata();


    const { width: newWidth, height: newHeight } = calculateImageSize(imageMeta, sizeSpec, density);

    const resizedImgBuffer = await sharpImage
      .resize({
        width: newWidth,
        height: newHeight,
        options: {
          fit: 'fill',
          withoutEnlargement: true,
        },
      })
      .toBuffer();

    file.contents = resizedImgBuffer;
    debug(`Created variant: ${file.basename} (${newWidth} x ${newHeight})`);
  } else {
    throw new Error(`Cannot edit ${file.basename} as its contents are not a Buffer.`);
  }

  return file;
}

/**
 * Creates all files for the given variant spec.
 *
 * A new file object will be created for each size (at each density)
 * specified by the variant spec. These files will be returned
 * as an array.
 *
 * The original file is not modified.
 *
 * @param {Vinyl} originalFile    The original image file object.
 * @param {string} variantName    The name of the variant.
 * @param {object} variantSpec    The variant spec.
 *
 * @return {Vinyl[]} An array containing the generated images' file objects.
 */
async function createSizes(originalFile, variantName, variantSpec) {
  const variantFiles = [];

  await asyncForEach(Object.keys(variantSpec.sizes), async (sizeName) => {
    const sizeSpec = variantSpec.sizes[sizeName];
    await asyncForEach(variantSpec.densities, async (density) => {
      variantFiles.push(await createDensities(
        originalFile, variantName, sizeName, sizeSpec, density,
      ));
    });
  });

  return variantFiles;
}

/**
 * Gulp plug-in for generating multiple resized and cropped variant copies
 * of images.
 *
 * Each supported image file passed into this pipe will be passed through, along
 * with a number of additional variants of itself. Other files will be ignored and
 * passed through unchanged.
 */
const gulpPlugin = ({ variants } = {}) => {
  if (!typeof variants === 'object' || Object.keys(variants).length === 0) {
    throw new Error('Image variants options requires at least on variant to be specified in the options');
  }

  /* eslint-disable func-names, prefer-arrow-callback */
  // Intionally using function() instead of arrow functions here
  // to ensure correct binding of this keyword to the through2
  // stream.
  return through.obj(async function (file, encoding, callback) {
    /* eslint-enable func-names, prefer-arrow-callback */
    if (file.isNull() || !supportedFiletypes.includes(file.extname)) {
      // nothing to do
      debug(`Passing through file ${file.basename} because it's not a support image format, or is an null file.`);
      return callback(null, file);
    }

    try {
      await asyncForEach(Object.keys(variants), async (variantName) => {
        const variantSpec = variants[variantName];
        if (
          variantSpec.match !== undefined
          && !micromatch.isMatch(file.relative, variantSpec.match)
        ) {
          debug(`Skipping variant "${variantName}" for file ${file.relative}, as it doesn't match variant's matching glob.`);
          return;
        }

        (await createSizes(file, variantName, variantSpec)).forEach((variantFile) => {
          this.push(variantFile);
        });
      });
    } catch (error) {
      debug(`Error occurred while generating variants for ${file.basename}!`);
      return callback(error);
    }

    debug(`Passing through original: ${file.basename}`);
    return callback(null, file);
  });
};

// Expose default file naming function
gulpPlugin.defaultFilenameFn = updateFilestem;

module.exports = gulpPlugin;
