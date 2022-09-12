FROM node:16-alpine

USER node

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY  --chown=node:node  . .

RUN npm i

CMD ["npm", "run", "storybook"]