FROM node:10.16.0-alpine

RUN mkdir -p /opt/app
WORKDIR /opt/app
RUN adduser --disabled-password app
COPY . .
#COPY .env .env
RUN chown -R app:app /opt/app
USER app
RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "start" ]