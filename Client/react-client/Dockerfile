FROM node:16.13.1-buster
WORKDIR /code

# Build args
ARG CLIENT_BASE_URL
ARG SERVER_BASE_URL

ENV CLIENT_BASE_URL=$CLIENT_BASE_URL
ENV SERVER_BASE_URL=$SERVER_BASE_URL

COPY package.json package.json
COPY package-lock.json package-lock.json

CMD ["npm", "install"]
CMD ["npm", "install", "http-server", "-g"]
CMD ["npm", "run" , "build"]

COPY . .

RUN npm install --global --unsafe-perm http-server
CMD ["http-server", "dist/"]