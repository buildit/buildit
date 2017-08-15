@Library('buildit')
def LOADED = true

node {

  withEnv(["PATH+NODE=${tool name: 'carbon', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'}/bin"]) {
    currentBuild.result = "SUCCESS"

    try {
      stage("Set Up") {

        sendNotifications = !env.DEV_MODE

        if(fileExists('.git')) {
          echo 'Perform workspace cleanup'
          sh "git clean -ffdx"
        }

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
        shortCommitHash = gitInst.getShortCommit()
        registryBase = "006393696278.dkr.ecr.${env.AWS_REGION}.amazonaws.com"
        registry = "https://${registryBase}"
        appUrl = "http://buildit.wiprodigital.com/"
        appName = "buildit-website"
        slackChannel = "buildit-website"
        gitUrl = "https://github.com/buildit/buildit"
      }

      stage("Copy Files from staging to prod") {
        sh "aws s3 sync s3://staging.buildit.digital s3://buildit.wiprodigital.com --region eu-west-2 --acl public-read --delete"
      }

      stage("Cleanup") {
        //build.clean()
        if (sendNotifications) slackInst.notify("Deployed to Production", "Commit '<${gitUrl}/commits/${shortCommitHash}|${shortCommitHash}>' has been deployed to <${appUrl}|${appUrl}>\n\n${commitMessage}", "good", "http://i296.photobucket.com/albums/mm200/kingzain/the_eye_of_sauron_by_stirzocular-d86f0oo_zpslnqbwhv2.png", slackChannel)
      }
    }
    catch (err) {
      currentBuild.result = "FAILURE"
      slackInst.notify("Error while deploying to Staging", "Commit <${gitUrl}/commits/\'${shortCommitHash}\'|\'${shortCommitHash}\'> failed to deploy.", "danger", "http://i296.photobucket.com/albums/mm200/kingzain/the_eye_of_sauron_by_stirzocular-d86f0oo_zpslnqbwhv2.png", slackChannel)
      throw err
    }
  }
}
