const git = require("git-last-commit");
const { promisify } = require("util");

// Holds cached commit info, so we don't need to
// re-read it every time.
let commitInfo = null;

async function getCommitInfo() {
  if (commitInfo === null) {
    commitInfo = await promisify(git.getLastCommit)();
  }
  return commitInfo;
}

module.exports = async function() {
  const bldInfo = {};

  const travisBuildNumber = process.env.TRAVIS_BUILD_NUMBER;
  if (travisBuildNumber === undefined) {
    bldInfo.isTravisBuild = false;
    bldInfo.description = "Local dev build";
  } else {
    const travisBuildId = process.env.TRAVIS_BUILD_ID;

    bldInfo.isTravisBuild = true;
    bldInfo.description = `Travis CI build #${travisBuildNumber}`;

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

  return bldInfo;
};
