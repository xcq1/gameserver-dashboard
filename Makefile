dashboard-run:
	cd dashboard && yarn start

server-run:
	cd server && node index.js

server-debug:
	cd server && node index.js -debug

docker-start:
	docker run -d -p 8080:3001 -e BASIC_AUTH=your-secret-password-here -v /var/run/docker.sock:/var/run/docker.sock xcq1/gameserver-dashboard