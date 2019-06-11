const git = require("git-last-commit");
const { promisify } = require("util");
const envs = require("./envs.js");
const moment = require("moment");

// Holds cached commit info, so we don't need to
// re-read it every time.
let commitInfo = null;

async function getCommitInfo() {
  if (isLocalBuild()) {
    return new Promise(resolve => resolve({}));
  }

  if (commitInfo === null) {
    commitInfo = await promisify(git.getLastCommit)();
  }

  return commitInfo;
}

function isLocalBuild() {
  const travisBuildNumber = process.env.TRAVIS_BUILD_NUMBER;
  return travisBuildNumber === undefined;
}

module.exports = async function() {
  const bldInfo = {};

  const travisBuildNumber = process.env.TRAVIS_BUILD_NUMBER;
  if (isLocalBuild()) {
    bldInfo.isTravisBuild = false;
    bldInfo.description = `Locally built ${envs.currentEnv} build`;
  } else {
    const travisBuildId = process.env.TRAVIS_BUILD_ID;

    bldInfo.isTravisBuild = true;
    bldInfo.description = `Travis CI built ${
      envs.currentEnv
    } #${travisBuildNumber}`;

    // Add some useful Travis build meta data
    bldInfo.travisBuildNumber = travisBuildNumber;
    bldInfo.travisBuildId = travisBuildId;
    bldInfo.travisBuildUrl = `https://travis-ci.org/buildit/buildit/builds/${travisBuildId}`;
  }

  const commitInfo = await getCommitInfo();
  bldInfo.commitHash = commitInfo.hash;
  bldInfo.commitShortHash = commitInfo.shortHash;
  bldInfo.commitGithubUrl = `https://github.com/buildit/buildit/commit/${
    commitInfo.hash
  }`;
  bldInfo.committedOn = moment
    .unix(commitInfo.committedOn)
    .format("YYYY-MM-DD HH:mm:ss");

  return bldInfo;
};
