pipeline {
    agent any

    tools {
        nodejs 'node_24.1.0'  // Must match the name set in Global Tool Configuration
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
