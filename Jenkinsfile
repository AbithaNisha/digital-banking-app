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
        bat 'docker rm -f banking-app || echo "No old container"'
        // Port-ah 3002-nu maathi paarunga
        bat 'docker run -d --name banking-app -p 3002:3000 digital-banking-app:latest'
    }
}
    }
}
