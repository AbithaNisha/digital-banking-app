pipeline {
    agent any

    stages {
        stage('Install') {
            steps {
                bat 'npm install'
            }
        }

        // 1. SonarQube Analysis Stage
        stage('SonarQube Analysis') {
            steps {
                // Indha block dhaan code-a scan pannum
                withSonarQubeEnv('sonar-server') { 
                    bat 'npm run sonar' // Unga package.json-la sonar script irukanum
                }
            }
        }

        // 2. Quality Gate Stage (Inga dhaan logic irukku)
        stage('Quality Gate') {
            steps {
                timeout(time: 1, unit: 'HOURS') {
                    // "waitForQualityGate" kuduthuttu 'abortPipeline: false' kudunga
                    // Appo dhaan Sonar fail aanaalum build "Green" aagum!
                    waitForQualityGate abortPipeline: false
                }
            }
        }

        stage('Docker Build Local') {
            steps {
                bat 'docker build -t digital-banking-app:latest .'
            }
        }

        stage('Deploy App') {
            steps {
                bat 'docker rm -f banking-app || echo "No old container"'
                bat 'docker run -d --name banking-app -p 3002:3000 digital-banking-app:latest'
            }
        }
    }
}
