# First Stage
FROM node:18 AS builder
ARG NEXUS_NPM_REPOSITORY
ARG NEXUS_NPM_TOKEN
ENV NODE_ENV build
ENV IS_WORKER false
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build \
    && npm prune --production
# Second Stage
FROM node:18
ARG NEXUS_NPM_REPOSITORY
ARG NEXUS_NPM_TOKEN
ENV NODE_ENV production
ENV IS_WORKER false
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/package*.json /usr/src/app/
COPY --from=builder /usr/src/app/node_modules/ /usr/src/app/node_modules/
COPY --from=builder /usr/src/app/dist/ /usr/src/app/dist/
EXPOSE 3000
CMD ["node", "dist/main"]