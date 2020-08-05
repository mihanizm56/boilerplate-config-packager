install:
	npm ci
lint:
	node ./cli/_utils/ci-utils/executor.js --command=lint-full
test:
	node ./cli/_utils/ci-utils/executor.js --command=test
integration-tests:
	node ./cli/_utils/ci-utils/executor.js --command=integration-tests
test-build: build
build:
	node ./cli/_utils/ci-utils/executor.js --command=build