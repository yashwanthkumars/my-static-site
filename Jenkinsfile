pipeline {
    agent {
        docker {
            image 'node:18'  // Official Node.js Docker images
            args '-u root'   // Run as root to install sshpass
        }
    }

    environment {
        DEPLOY_USER = 'Yashwanth'
        DEPLOY_HOST = '20.57.34.82'
        DEPLOY_PASS = credentials('vm-password')
    }

    stages {
        stage('Prepare Environment') {
            steps {
                sh 'apt-get update && apt-get install -y sshpass'
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
