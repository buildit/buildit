const Moment = require('moment');

module.exports = (a, b) => {
  const aDate = Moment(a.date);
  const bDate = Moment(b.date);

  // Test for NaN
  if (!aDate.isValid() && !bDate.isValid()) return 0;
  if (!aDate.isValid()) return 1;
  if (!bDate.isValid()) return -1;

  // Normal comparison, want lower numbers first
  if (aDate.isAfter(bDate)) return 1;
  if (aDate.isBefore(bDate)) return -1;
  return 0;
};
