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

    const pathComponents = url.split("/index.");
    url = pathComponents[0];
    if (pathComponents.length > 1) {
      url = url + "/";
    }

    files[file][property] = url === "." ? "" : url;
  });
};
