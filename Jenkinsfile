pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "administratordevops/nodejs-app"
        DOCKER_TAG = "${BUILD_NUMBER}"
        SSH_PORT = 30800
        SERVER_IP = "195.158.24.178"
        SERVER_USER = "administrator"
        SSH_KEY = "server-ssh-key" // Jenkins credentials ID
        REPO_URL = "https://github.com/otabek-allanazarov/nodejs-app.git"
    }

    stages {

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh "echo \$DOCKER_PASS | docker login -u \$DOCKER_USER --password-stdin"
                    sh "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
                }
            }
        }

        stage('Deploy via Docker-Compose') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: "${SSH_KEY}", keyFileVariable: 'KEY')]) {
                    sh """
                    ssh -p ${SSH_PORT} -i ${KEY} -o StrictHostKeyChecking=no -o ConnectTimeout=10 ${SERVER_USER}@${SERVER_IP} '
                        cd /home/${SERVER_USER}/nodejs-app &&
                        git fetch --all &&
                        git reset --hard origin/main &&
                        git clean -fd &&
                        export DOCKER_IMAGE=${DOCKER_IMAGE} &&
                        export DOCKER_TAG=${DOCKER_TAG} &&
                        docker-compose pull app &&
                        docker-compose up -d
                    '
                    """
                }
            }
        }
    }
}