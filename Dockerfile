FROM node:13.10

# Create app directory
RUN mkdir /home/node/app
WORKDIR  /home/node/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./

RUN yarn add standard --global
# If you are building your code for production
# RUN npm ci --only=production


COPY . .
EXPOSE 3000

CMD [ "yarn", "start" ]