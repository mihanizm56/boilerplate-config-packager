install:
	npm ci
lint:
	node ./cli/_utils/ci-utils/executor.js --command=lint-full
test:
	node ./cli/_utils/ci-utils/executor.js --command=test
check-types:
	node ./cli/_utils/ci-utils/executor.js --command=check-types
cra-build:
	node ./cli/_utils/ci-utils/executor.js --command=cra-build
integration-tests:
	node ./cli/_utils/ci-utils/executor.js --command=integration-tests
build:
	node ./cli/_utils/ci-utils/executor.js --command=module-build