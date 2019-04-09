/**
 * Sort function for use with metalsmith collections plugin.
 *
 * Pass the name of the index as the parameter and a sorting function based on that index is returned.
 *
 * e.g. in metalsmith.js:
 * ```
 * collections({
 *   colMainNav: {
 *     sortBy: namedIndexSort("nav-index")
 *   }
 * })
 * ```
 *
 * @param indexName
 * @returns {Function}
 */
module.exports = indexName => (a, b) => {
  let aNum, bNum;

  aNum = Number(a[indexName]);
  bNum = Number(b[indexName]);

  // Test for NaN
  if (aNum != aNum && bNum != bNum) return 0;
  if (aNum != aNum) return 1;
  if (bNum != bNum) return -1;

  // Normal comparison, want lower numbers first
  if (aNum > bNum) return 1;
  if (bNum > aNum) return -1;
  return 0;
};
