pipeline {
  agent any
  stages {
    stage('Login to ECR') {
      steps {
        sh '''#!/bin/bash
          aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 473702960913.dkr.ecr.us-west-2.amazonaws.com
        '''
      }
    }
    stage('Clone repository') {
      steps {
        script {
          checkout scm
        }
      }
    }
  }
  post {
    always {
      echo 'TASK 2: '
    }
    success {
      echo 'SUCCESS'
    }
    failure {
      echo 'FAILED'
    }
  }
}