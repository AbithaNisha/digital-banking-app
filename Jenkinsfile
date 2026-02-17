pipeline {
    agent any

    stages {
        stage('Install') {
            steps {
                bat 'npm install'
            }
        }

        stage('Docker Build Local') {
            steps {
                // Docker Hub-ku push pannaama local-ah image create pannum
                bat 'docker build -t digital-banking-app:latest .'
            }
        }

        stage('Deploy App') {
            steps {
                // Pazhaya container-ah remove pannitu fresh-ah run pannuvom
                bat 'docker rm -f banking-app || echo "No old container to remove"'
                bat 'docker run -d --name banking-app -p 3001:3000 digital-banking-app:latest'
            }
        }
    }
}
