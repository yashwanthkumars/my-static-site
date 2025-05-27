pipeline {
    agent any

    stages {
        stage('Test') {
            steps {
                sh 'node test/dummy.test.js'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Static site ready for deployment.'
            }
        }
    }

    post {
        success {
            echo '✅ Static site tested!'
        }
        failure {
            echo '❌ Test or deploy failed.'
        }
    }
}
