const path = require("path");

module.exports = ({ property = "path", baseDirectory = "" } = {}) => (
  files,
  _,
  done
) => {
  setImmediate(done);

  Object.keys(files).forEach(file => {
    let url = baseDirectory + file;

    files[file]["origPath"] = url;

    const subpath = url.indexOf("/") > -1;
    const separator = `${subpath ? "/" : ""}index.`;
    const pathComponents = url.split(separator);
    url = pathComponents[0];
    if (subpath && pathComponents.length > 1) {
      url = url + "/";
    }

    files[file][property] = url === "." ? "" : url;
  });
};
