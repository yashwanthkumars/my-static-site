pipeline {
    agent any

    tools {
        nodejs 'node_24.1.0' // Ensure this matches your Jenkins NodeJS tool name
    }

    environment {
        DEPLOY_USER = 'Yashwanth'
        DEPLOY_HOST = '20.57.34.82'
        DEPLOY_PASS = credentials('vm-password')
        DEPLOY_PATH = '/var/www/html/'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/yashwanthkumars/my-static-site.git'
            }
        }

        stage('Install Dependencies') {
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
                sh '''
                    sshpass -p "$DEPLOY_PASS" scp -o StrictHostKeyChecking=no -r index.html $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Website deployed successfully!'
        }
        failure {
            echo '❌ Something went wrong.'
        }
    }
}
