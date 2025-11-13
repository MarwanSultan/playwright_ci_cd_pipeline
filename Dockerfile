FROM node:20-bullseye

WORKDIR /app

COPY package*.json ./
RUN npm ci

RUN npx playwright install --with-deps
COPY . .

ENV PUSHGATEWAY_URL=http://pushgateway:9091
ENV GITHUB_RUN_ID=local-run

CMD ["npx", "playwright", "test"]
