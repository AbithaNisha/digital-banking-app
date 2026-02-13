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
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', passwordVariable: 'DOCKER_PASS', usernameVariable: 'DOCKER_USER')]) {
                        bat "docker login -u %DOCKER_USER% -p %DOCKER_PASS%"
                        bat "docker build -t abithanisha/digital-banking-app:latest ."
                        bat "docker push abithanisha/digital-banking-app:latest"
                    }
                }
            }
        }
      stage('Deploy App') {
    steps {
        // Port 3000-ku badhula 3001 use panrom
        bat 'docker run -d -p 3001:3000 abithanisha/digital-banking-app:latest'
    }
}
    }
}
