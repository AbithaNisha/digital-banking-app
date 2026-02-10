pipeline {
    agent any

    stages {
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'echo "No build needed for simple HTML/JS app"'
            }
        }
        stage('Docker Build & Push') {
            steps {
                sh 'docker build -t yourdockerhubusername/digital-banking-app:latest .'
                sh 'docker push yourdockerhubusername/digital-banking-app:latest'
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f src/kubernetes/deployment.yaml'
            }
        }
    }
}
