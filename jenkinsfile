pipeline {
  agent any
  options {
    skipStagesAfterUnstable()
  }
  stages {
    stage('Clone repository') { 
      steps { 
        script{
          checkout scm
        }
      }
    }
    stage('Build') { 
      steps { 
        script{
          app = docker.build("app")
        }
      }
    }
    stage('Deploy') {
      steps {
        script{
          docker.withRegistry('https://473702960913.dkr.ecr.us-west-2.amazonaws.com', 'ecr:us-west-2:aws-credentials') {
            app.push("${env.BUILD_NUMBER}")
            app.push("latest")
          }
        }
      }
    }
  }
}