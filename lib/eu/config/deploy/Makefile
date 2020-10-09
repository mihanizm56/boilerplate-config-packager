install:
	npm ci

frontend_complex:
	node ./cli/_utils/ci-utils/executor.js --command=test && node ./cli/_utils/ci-utils/executor.js --command=lint-full && git add . && node ./cli/_utils/ci-utils/executor.js --command=check-types && node ./cli/_utils/ci-utils/executor.js --command=cra-build && node ./cli/_utils/ci-utils/executor.js --command=module-build
