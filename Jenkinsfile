node('jenkins-slave') {
  currentBuild.result = 'SUCCESS'

  try {
    stage('Login   to ECR') {
      sh(script: '''
      aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 473702960913.dkr.ecr.us-west-2.amazonaws.com
      ''')
    }

    stage('Checkout') {
      checkout scm
      VERSION = sh(returnStdout: true, script: "grep 'version' package.json | cut -d '\"' -f4 | tr '\\n' '\\0'")
      BRANCH = scm.branches[0].name
      if (BRANCH.contains('*/')) {
        BRANCH = BRANCH.split('\\*/')[1]
      }
      COMMITID = sh(returnStdout: true, script: "git log -n 1 --pretty=format:'%h'").trim()
      BUILDDATE = java.time.LocalDateTime.now()
    }

    stage('Build image') {
      sh(script: """
      docker build --network host -t mark-nodejs-1 --build-arg git_branch=${BRANCH} --build-arg git_date=${BUILDDATE} --build-arg git_commit=${COMMITID} .
      """)
    }

    stage('Tag image') {
      sh(script: """
      docker tag mark-nodejs-1:latest 473702960913.dkr.ecr.us-west-2.amazonaws.com/devops-101:mark-v${VERSION}.${env.BUILD_ID}
      """)
    }

    stage('Push image to ECR') {
      sh(script: """
      docker push 473702960913.dkr.ecr.us-west-2.amazonaws.com/devops-101:mark-v${VERSION}.${env.BUILD_ID}
      """)
    }
  }
  catch (err) {
    currentBuild.result = 'FAILURE'

    throw err
  }
}
