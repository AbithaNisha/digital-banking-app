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
                    def scannerHome = tool 'sonar-scanner'
                    def javaHome = tool 'jdk21' 
                    
                    withEnv(["JAVA_HOME=${javaHome}"]) {
                        withSonarQubeEnv('sonar-server') {
                            // Inga unga token-ah sariyaa replace panniyachaen
                            bat "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=digital-banking-app -Dsonar.sources=. -Dsonar.host.url=http://localhost:9000 -Dsonar.token=sqp_b510422b58ea5b24d48e551cc1fe203a411100b5"
                        }
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
