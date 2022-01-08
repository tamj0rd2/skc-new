setup:
	cd frontend && npm ci
	cd infra && npm ci

setup-ci: setup
	curl -fsSL https://get.pulumi.com | sh

dev:
	open http://localhost:3000
	cd frontend && npx next dev

test: typecheck unit-test

build:
	cd frontend && npx next build && npx next export -o build

# TODO: switch these commands to the prod stack once I'm happy with the site
deploy: build
	cd infra && pulumi stack select skc-frontend-dev && pulumi up -f -y
	cd infra && BUCKET_NAME=$$(pulumi stack output bucketName) docker-compose up s3-upload

destroy:
	cd infra && pulumi stack select skc-frontend-dev && pulumi destroy -f

ci:
	git pull -r && make test && git push

typecheck:
	cd frontend && npx tsc --noEmit
	cd frontend/cypress && npx tsc --noEmit

unit-test:
	cd frontend && npx jest

integration-test: build
	cd frontend && npx cypress run
