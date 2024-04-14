# specify base image
FROM node:20

# set working directory for commands below
WORKDIR /code

# install dependencies in package.json
COPY ./package.json .
RUN npm install
RUN npm install -g gulp-cli

COPY . ./

# https://devopscube.com/keep-docker-container-running/
ENTRYPOINT ["tail", "-f", "/dev/null"]