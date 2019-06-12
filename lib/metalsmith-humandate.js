const Moment = require('moment');

module.exports = ({
  propertyIn = 'date',
  propertyOut = 'humanDate',
  format = 'MMMM D, YYYY',
} = {}) => (files, _, done) => {
  setImmediate(done);
  Object.keys(files).forEach((file) => {
    // eslint-disable-next-line no-prototype-builtins
    if (files[file].hasOwnProperty(propertyIn)) {
      const m = new Moment(files[file][propertyIn]);
      if (m.isValid()) {
        // eslint-disable-next-line no-param-reassign
        files[file][propertyOut] = m.format(format);
      } else {
        // eslint-disable-next-line no-param-reassign
        files[file][propertyOut] = '';
      }
    }
  });
};
