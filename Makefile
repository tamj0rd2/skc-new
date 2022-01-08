setup:
	cd frontend && npm ci
dev:
	open http://localhost:3000
	cd frontend && npm run dev
test:
	cd frontend && npm run test
ci:
	git pull -r && make test && git push
