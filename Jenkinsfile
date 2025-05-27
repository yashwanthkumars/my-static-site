pipeline {
    agent any

    tools {
        nodejs 'node-18'  // Must match the name set in Global Tool Configuration
    }

    stages {
        stage('Check Versions') {
            steps {
                sh 'node -v'
                sh 'npm -v'
            }
        }
    }
}
