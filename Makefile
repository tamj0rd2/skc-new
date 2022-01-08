setup:
	cd frontend && npm ci

dev:
	open http://localhost:3000
	cd frontend && npx next dev

test: typecheck unit-test

ci:
	git pull -r && make test && git push

typecheck:
	cd frontend && npx tsc --noEmit
	cd frontend/cypress && npx tsc --noEmit

unit-test:
	cd frontend && npx jest

integration-test: build
	cd frontend && npx cypress run

build:
	cd frontend && npx next build && npx next export -o build
