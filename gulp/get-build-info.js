const git = require('git-last-commit');
const { promisify } = require('util');
const moment = require('moment');
const envs = require('./envs.js');

// Holds cached commit info, so we don't need to
// re-read it every time.
let commitInfo = null;

function isLocalBuild() {
  const travisBuildNumber = process.env.TRAVIS_BUILD_NUMBER;
  return travisBuildNumber === undefined;
}

async function getCommitInfo() {
  if (isLocalBuild()) {
    return new Promise(resolve => resolve({
      hash: '',
      shortHash: '',
    }));
  }

  if (commitInfo === null) {
    commitInfo = await promisify(git.getLastCommit)();
  }

  return commitInfo;
}

module.exports = async () => {
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

  const commitInfoBuild = await getCommitInfo();
  bldInfo.commitHash = commitInfoBuild.hash;
  bldInfo.commitShortHash = commitInfoBuild.shortHash;
  bldInfo.commitGithubUrl = `https://github.com/buildit/buildit/commit/${
    commitInfoBuild.hash
  }`;
  bldInfo.committedOn = moment
    .unix(commitInfoBuild.committedOn)
    .format('YYYY-MM-DD HH:mm:ss');

  return bldInfo;
};
