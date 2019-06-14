module.exports = ({ property = 'path', baseDirectory = '' } = {}) => (
  files,
  _,
  done,
) => {
  setImmediate(done);

  Object.keys(files).forEach((file) => {
    let url = baseDirectory + file;

    // eslint-disable-next-line no-param-reassign
    files[file].origPath = url;

    url = url.replace(/\\/g, '/');

    const subpath = url.indexOf('/') > -1;
    const separator = `${subpath ? '/' : ''}index.`;
    const pathComponents = url.split(separator);
    // eslint-disable-next-line prefer-destructuring
    url = pathComponents[0];
    if (subpath && pathComponents.length > 1) {
      url += '/';
    }

    // eslint-disable-next-line no-param-reassign
    files[file][property] = url === '.' ? '' : url;
  });
};
