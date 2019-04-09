const Moment = require("moment");

module.exports = ({
  propertyIn = "date",
  propertyOut = "humanDate",
  format = "MMMM D, YYYY"
} = {}) => (files, _, done) => {
  setImmediate(done);
  Object.keys(files).forEach(file => {
    if (files[file].hasOwnProperty(propertyIn)) {
      const m = new Moment(files[file][propertyIn]);
      if (m.isValid()) {
        files[file][propertyOut] = m.format(format);
      } else {
        files[file][propertyOut] = "";
      }
    }
  });
};
