/**
 * Metalsmith plug-in that can group array in the metadata (such
 * as collections) by a given key.
 */
const debug = require('debug')('metalsmith-group-by-key');

module.exports = function plugin({
  propertyIn,
  propertyOut,
  key,
} = {}) {
  return (files, metalsmith, done) => {
    debug(`Grouping "${propertyIn}"...`);

    const metadata = metalsmith.metadata();
    const sourceArray = metadata[propertyIn];
    if (sourceArray === undefined) {
      done(`Metadata does not have a "${propertyIn}" property.`);
    }

    const groupedItems = sourceArray.reduce((accumulator, item) => {
      const propVal = item[key];

      // Get the array of items for this property
      let propItems = accumulator[propVal];
      if (propItems === undefined) {
        // None exists yet, so start a new array
        propItems = [];
      }

      // Add item to this property's array
      propItems.push(item);
      accumulator[propVal] = propItems;
      return accumulator;
    }, {});

    // Add item listings to existing metadata
    metadata[propertyOut] = groupedItems;

    debug(`Grouped "${propertyIn}" into ${Object.keys(groupedItems).length} groups as "${propertyOut}".`);

    metalsmith.metadata(metadata);
    done();
  };
};
