# incomplete

docker-run-detached:
	docker run -d --restart unless-stopped  --name super-api --env HOST=18.224.58.238:27017 --env PORT=80 -p 3000:80 robertrossilli/super-api:1.0.2

docker-run:
	docker run --restart unless-stopped  --name super-api --env HOST=18.224.58.238:27017 --env PORT=80 -p 3000:80 robertrossilli/super-api:1.0.2

dev:
	npm run dev

prod:
	npm run start