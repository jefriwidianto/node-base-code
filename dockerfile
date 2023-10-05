FROM keymetrics/pm2:14-alpine

# COPY Bundle APP files
WORKDIR /node/src/base-code
ADD . /node/src/base-code

COPY . .

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install
RUN apk add --no-cache ffmpeg

ARG APP_ENV
ENV env_state=$APP_ENV

EXPOSE 8080
CMD pm2-runtime start pm2/ecosystem.config.js --env $env_state