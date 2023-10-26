pipeline {
  agent any
  stages {
    stage('git code') {
      steps {
        git(url: 'https://github.com/FzzfSisyphus/flightWar.git', branch: 'main')
      }
    }

    stage('frontend build') {
      steps {
        sh '''npm install 
npm run dev 
'''
      }
    }

  }
}