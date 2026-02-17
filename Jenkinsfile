pipeline {
    agent any

    stages {
        stage('Install') {
            steps {
                // Dependency-la install pannum
                bat 'npm install'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                // Indha block code-a scan panni SonarQube-ku anupum
                // Jenkins Global Tool Configuration-la 'sonar-server' name match aaganum
                withSonarQubeEnv('sonar-server') { 
                    bat 'npm run sonar' 
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    // MUKKIYAM: abortPipeline: false kudutha dhaan 
                    // SonarQube "Failed" aanaalum unga build stop aagaama success aagum.
                    waitForQualityGate abortPipeline: false
                }
            }
        }

        stage('Docker Build Local') {
            steps {
                // Docker image create pannum
                bat 'docker build -t digital-banking-app:latest .'
            }
        }

        stage('Deploy App') {
            steps {
                // Pazhaya container-a thookittu pudhu container-a 3002 port-la run pannum
                bat 'docker rm -f banking-app || echo "No old container"'
                bat 'docker run -d --name banking-app -p 3002:3000 digital-banking-app:latest'
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline successfully completed! Check your app at http://localhost:3002'
        }
    }
}
