pipeline {
    agent any

    stages {
        stage('Install') {
            steps {
                bat 'npm install'
            }
        }
        
        // --- Pudhu Stage Start ---
        stage('SonarQube Analysis') {
            steps {
                script {
                    // Jenkins Tools-la neenga kudutha 'sonar-scanner' peyar correct-aa irukkanum
                    def scannerHome = tool 'sonar-scanner' 
                    
                    // Jenkins System-la neenga kudutha 'sonar-server' peyar correct-aa irukkanum
                    withSonarQubeEnv('sonar-server') {
                        bat "${scannerHome}/bin/sonar-scanner " +
                        "-Dsonar.projectKey=digital-banking-app " +
                        "-Dsonar.sources=. " +
                        "-Dsonar.host.url=http://localhost:9000 " +
                        "-Dsonar.login=admin " +
                        "-Dsonar.password=admin" 
                    }
                }
            }
        }
        // --- Pudhu Stage End ---

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
                bat 'docker run -d -p 3001:3000 abithanisha/digital-banking-app:latest'
            }
        }
    }
}
