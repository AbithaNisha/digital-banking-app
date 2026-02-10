pipeline {
    agent any

    stages {
        stage('Install') {
            steps {
                bat 'npm install'
            }
        }
        stage('Build') {
            steps {
                bat 'echo "No build needed for simple HTML/JS app"'
            }
        }
        stage('Docker Build & Push') {
            steps {
                bat 'docker build -t yourdockerhubusername/digital-banking-app:latest .'
                bat 'docker push yourdockerhubusername/digital-banking-app:latest'
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                bat 'kubectl apply -f src/kubernetes/deployment.yaml'
            }
        }
    }
}
