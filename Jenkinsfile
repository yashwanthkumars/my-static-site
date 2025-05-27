pipeline {
    agent any

    tools {
        nodejs 'node_24.1.0'  // Must match the name in Global Tool Configuration
    }

    environment {
        DEPLOY_USER = 'Yashwanth'
        DEPLOY_HOST = '20.57.34.82'
        DEPLOY_PASS = credentials('vm-password')
    }

    stages {
        stage('Check Versions') {  
            steps {
                sh 'node -v'
                sh 'npm -v'
            }
        }

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/yashwanthkumars/my-static-site.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint || true' // Allow lint to fail without failing the pipeline
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
                    sshpass -p "$DEPLOY_PASS" scp -o StrictHostKeyChecking=no -r * $DEPLOY_USER@$DEPLOY_HOST:/var/www/html/
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
