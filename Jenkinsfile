pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "administratordevops/nodejs-app"
        DOCKER_TAG = "1.0"
    }

    stages {

        stage('Clone Repository') {
            steps {
                git 'https://github.com/otabek-allanazarov/nodejs-app.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE:$DOCKER_TAG .'
            }
        }

        stage('Login to DockerHub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                }
            }
        }

        stage('Push Image') {
            steps {
                sh 'docker push $DOCKER_IMAGE:$DOCKER_TAG'
            }
        }

    }
}