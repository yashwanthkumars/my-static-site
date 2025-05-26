pipeline {
    agent any

    environment {
        DEPLOY_USER = 'Yashwanth'  // Replace with your VM username
        DEPLOY_HOST = '20.57.34.82' // Replace with your VM's public IP
        DEPLOY_PASS = credentials('Ykumar@123456789') // Jenkins credentials ID
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/yashwanthkumars/my-static-site.git'
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
