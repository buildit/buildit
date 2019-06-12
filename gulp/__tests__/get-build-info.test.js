const getBuildInfo = require('../get-build-info');

describe('getBuildInfo()', () => {
  afterEach(() => {
    delete process.env.TRAVIS_BUILD_NUMBER;
  });

  it('should be a function', () => {
    expect(typeof getBuildInfo).toBe('function');
  });

  it('should return a promise that resolves to an object', async () => {
    const buildInfo = await getBuildInfo();
    expect(typeof buildInfo).toBe('object');
  });

  it('should always return a isTravisBuild property', async () => {
    const buildInfo = await getBuildInfo();
    expect(buildInfo).toHaveProperty('isTravisBuild');
    expect(typeof buildInfo.isTravisBuild).toBe('boolean');
  });

  it('should always return a description property', async () => {
    const buildInfo = await getBuildInfo();
    expect(buildInfo).toHaveProperty('description');
    expect(typeof buildInfo.description).toBe('string');
  });

  it('should always return a commitHash property', async () => {
    const buildInfo = await getBuildInfo();
    expect(buildInfo).toHaveProperty('commitHash');
    expect(typeof buildInfo.commitHash).toBe('string');
  });

  it('should always return a commitShortHash property', async () => {
    const buildInfo = await getBuildInfo();
    expect(buildInfo).toHaveProperty('commitShortHash');
    expect(typeof buildInfo.commitShortHash).toBe('string');
  });

  it('should always return a commitGithubUrl property', async () => {
    const buildInfo = await getBuildInfo();
    expect(buildInfo).toHaveProperty('commitGithubUrl');
    expect(typeof buildInfo.commitGithubUrl).toBe('string');
  });

  it('should identify a Travis CI build', async () => {
    process.env.TRAVIS_BUILD_NUMBER = '123456';
    const buildInfo = await getBuildInfo();
    expect(buildInfo.isTravisBuild).toBe(true);
  });

  it('should identify a local build', async () => {
    delete process.env.TRAVIS_BUILD_NUMBER;
    const buildInfo = await getBuildInfo();
    expect(buildInfo.isTravisBuild).toBe(false);
  });

  it('should return a travisBuildNumber property for Travis CI builds', async () => {
    process.env.TRAVIS_BUILD_NUMBER = '123456';
    process.env.TRAVIS_BUILD_ID = '654321';
    const buildInfo = await getBuildInfo();
    expect(buildInfo).toHaveProperty('travisBuildNumber');
    expect(typeof buildInfo.travisBuildNumber).toBe('string');
  });

  it('should return a travisBuildId property for Travis CI builds', async () => {
    process.env.TRAVIS_BUILD_NUMBER = '123456';
    process.env.TRAVIS_BUILD_ID = '654321';
    const buildInfo = await getBuildInfo();
    expect(buildInfo).toHaveProperty('travisBuildId');
    expect(typeof buildInfo.travisBuildId).toBe('string');
  });

  it('should return a travisBuildUrl property for Travis CI builds', async () => {
    process.env.TRAVIS_BUILD_NUMBER = '123456';
    process.env.TRAVIS_BUILD_ID = '654321';
    const buildInfo = await getBuildInfo();
    expect(buildInfo).toHaveProperty('travisBuildUrl');
    expect(typeof buildInfo.travisBuildUrl).toBe('string');
  });
});
