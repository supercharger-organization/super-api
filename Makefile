# incomplete
# mongodb-prod := 3.128.254.245:27017
mongodb-prod := 18.224.58.238:27017
mongodb-dev := host.docker.internal

docker-build:
	docker build --tag super-api:1.0 .

docker-run-prod:
	docker run -d --restart unless-stopped --env HOST=$(mongodb-prod) --env PORT=3000 -p 3000:3000 --name super-api super-api:1.0

docker-run-dev:
	docker run --restart unless-stopped --env HOST=$(mongodb-dev) --env PORT=3000 -p 3000:3000 --name super-api super-api:1.0

dev:
	npm run dev

prod:
	npm run start