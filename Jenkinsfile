pipeline {
    agent any

    tools {
        nodejs 'node_24.1.0' // Ensure this matches your Jenkins NodeJS tool name
    }

    environment {
        DEPLOY_USER = 'Yashwanth'
        DEPLOY_HOST = '20.57.34.82'
        DEPLOY_PATH = '/var/www/html/'
        DEPLOY_PASS = 'Ykumar@123456789'
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

        stage('Test') {
            steps {
                sh 'npm test || true'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    sshpass -p "$DEPLOY_PASS" scp -o StrictHostKeyChecking=no -r * $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH
                    sshpass -p "$DEPLOY_PASS" ssh -o StrictHostKeyChecking=no $DEPLOY_USER@$DEPLOY_HOST "cd $DEPLOY_PATH && npm install && pkill -f 'node server.js' || true && nohup node server.js > backend.log 2>&1 &"
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
