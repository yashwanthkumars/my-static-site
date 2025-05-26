pipeline {
    agent any

    environment {
        DEPLOY_USER = 'Yashwanth'
        DEPLOY_HOST = '20.57.34.82'
        DEPLOY_PASS = credentials('vm-password')
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://${{secrets.Token}}@github.com/yashwanthkumars/my-static-site.git'
            }
        }

        stage('Install Tools') {
            steps {
                sh 'npm install'
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint || true'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh """
                        sshpass -p "$DEPLOY_PASS" scp -o StrictHostKeyChecking=no -r * $DEPLOY_USER@$DEPLOY_HOST:/var/www/html/
                    """
                }
            }
        }
    }

    post {
        success {
            echo 'Website deployed successfully!'
        }
        failure {
            echo 'Something went wrong.'
        }
    }
}
