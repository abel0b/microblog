FROM node:11-alpine
ENV NODE_ENV development
WORKDIR /usr/src/app
RUN apk add --no-cache curl python make g++ util-linux
RUN curl -L https://unpkg.com/@pnpm/self-installer | node
COPY package.json .
RUN pnpm install --shamefully-flatten
COPY . .
RUN pnpm run build
RUN pnpm run seed
CMD pnpm start
EXPOSE 8080
