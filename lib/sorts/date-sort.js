const Moment = require("moment");

module.exports = (a, b) => {
  aDate = Moment(a["date"]);
  bDate = Moment(b["date"]);

  console.log(a.title, aDate.toISOString());
  console.log(b.title, bDate.toISOString());

  // Test for NaN
  if (!aDate.isValid() && !bDate.isValid()) return 0;
  if (!aDate.isValid()) return 1;
  if (!bDate.isValid()) return -1;

  // Normal comparison, want lower numbers first
  if (aDate.isAfter(bDate)) return 1;
  if (aDate.isBefore(bDate)) return -1;
  return 0;
};
