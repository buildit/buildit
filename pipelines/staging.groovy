@Library('buildit')
def LOADED = true

node {

  withEnv(["PATH+NODE=${tool name: 'carbon', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'}/bin"]) {
    currentBuild.result = "SUCCESS"

    try {
      stage "Set Up"

        sendNotifications = !env.DEV_MODE

        if (env.USE_GLOBAL_LIB) {
          ecrInst = new ecr()
          gitInst = new git()
          npmInst = new npm()
          slackInst = new slack()
          convoxInst = new convox()
          templateInst = new template()
        } else {
          sh "curl -L https://dl.bintray.com/buildit/maven/jenkins-pipeline-libraries-${env.PIPELINE_LIBS_VERSION}.zip -o lib.zip && echo 'A' | unzip lib.zip"
          ecrInst = load "lib/ecr.groovy"
          gitInst = load "lib/git.groovy"
          npmInst = load "lib/npm.groovy"
          slackInst = load "lib/slack.groovy"
          convoxInst = load "lib/convox.groovy"
          templateInst = load "lib/template.groovy"
        }

        domain = env.RIG_DOMAIN ? "riglet" : "buildit.tools"
        registryBase = "006393696278.dkr.ecr.${env.AWS_REGION}.amazonaws.com"
        registry = "https://${registryBase}"
        appUrl = "http://website.${domain}/"
        appName = "buildit-website"
        slackChannel = "test-shahzain"
        gitUrl = "https://github.com/buildit/buildit"

      stage "Checkout"
        checkout scm

        sh "git clean -ffdx"

        // global for exception handling
        shortCommitHash = gitInst.getShortCommit()
        commitMessage = gitInst.getCommitMessage()
        version = npmInst.getVersion()

      stage "Build"
        sh "npm run build"

      //stage "Lint"
      //build.lint()

      //stage "Test"
       // build.test()
       // step([$class: 'JUnitResultArchiver', testResults: 'reports/test-results.xml'])
       // publishHTML(target: [reportDir: 'reports', reportFiles: 'test-results.html', reportName: 'Test Results'])
       // publishHTML(target: [reportDir: 'reports/coverage', reportFiles: 'index.html', reportName: 'Coverage Results'])

      //stage "Analysis"
      //  sh "/usr/local/sonar-scanner-2.6.1/bin/sonar-scanner -e -Dsonar.projectVersion=${version}"

      //stage "Docker Image Build"
        //def tag = "${version}-${shortCommitHash}-${env.BUILD_NUMBER}"
        //def image = docker.build("${appName}:${tag}", '.')
        //ecrInst.authenticate(env.AWS_REGION)

      //stage "Docker Push"
        //docker.withRegistry(registry) {
          //image.push("${tag}")
        //}

      stage "Deploy To Staging"
        sh "aws s3 sync dist/ s3://staging.buildit.digital --region eu-west-2 --acl public-read --delete"
        //def tmpFile = UUID.randomUUID().toString() + ".tmp"
        //def ymlData = templateInst.transform(readFile("docker-compose.yml.template"), [tag: tag, registryBase: registryBase])
        //writeFile(file: tmpFile, text: ymlData)

        //sh "convox login ${env.CONVOX_RACKNAME} --password ${env.CONVOX_PASSWORD}"
        //sh "convox deploy --app ${appName}-staging --description '${tag}' --file ${tmpFile} --wait"
        // wait until the app is deployed
        //convoxInst.waitUntilDeployed("${appName}-staging")
        //convoxInst.ensureSecurityGroupSet("${appName}-staging", env.CONVOX_SECURITYGROUP)

      //stage "Promote Build to latest"
      //  docker.withRegistry(registry) {
       //   image.push("latest")
       // }

      stage "Cleanup"
        //build.clean()
        if (sendNotifications) slackInst.notify("Deployed to Staging", "Commit '<${gitUrl}/commits/${shortCommitHash}|${shortCommitHash}>' has been deployed to <${appUrl}|${appUrl}>\n\n${commitMessage}", "good", "http://i296.photobucket.com/albums/mm200/kingzain/the_eye_of_sauron_by_stirzocular-d86f0oo_zpslnqbwhv2.png", slackChannel)
    }
    catch (err) {
      currentBuild.result = "FAILURE"
      slack.notify("Error while deploying to Staging", "Commit <${gitUrl}/commits/\'${shortCommitHash}\'|\'${shortCommitHash}\'> failed to deploy.", "danger", "http://i296.photobucket.com/albums/mm200/kingzain/the_eye_of_sauron_by_stirzocular-d86f0oo_zpslnqbwhv2.png", slackChannel)
      throw err
    }
  }
}
