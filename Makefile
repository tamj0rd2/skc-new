setup:
	cd frontend && npm ci
	cd infra && npm ci

setup-ci: setup
	curl -fsSL https://get.pulumi.com | sh

dev:
	open http://localhost:3000
	cd frontend && npx next dev

test: typecheck lint unit-test integration-test

build:
	cd frontend && npx next build && npx next export -o build

# TODO: switch these commands to the prod stack once I'm happy with the site
deploy: build
	cd infra && pulumi stack select skc-frontend-dev && pulumi up -f -y
	cd infra && BUCKET_NAME=$$(pulumi stack output bucketName) docker-compose run s3-upload

destroy:
	cd infra && pulumi stack select skc-frontend-dev && pulumi destroy -f

ci:
	git pull -r && make test && git push

typecheck:
	cd frontend && npx tsc --noEmit
	cd frontend/cypress && npx tsc --noEmit
	cd infra && npx tsc --noEmit

typecheck-watch:
	./frontend/node_modules/.bin/tsc -b ./tsconfig.json --watch

unit-test:
	cd frontend && npx jest
unit-test-watch:
	cd frontend && npx jest --watch

integration-test: build
	cd frontend && CYPRESS_USE_BUILD=true npx cypress run

integration-test-watch:
	cd frontend && CYRPESS_baseUrl=http://localhost:3000 npx cypress open

lint:
	cd frontend && npx eslint '**/*.ts'

lintfix:
	cd frontend && npx eslint '**/*.ts' --fix
