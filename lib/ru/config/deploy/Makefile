frontend_complex:
	npm ci && node ./cli/_utils/ci-utils/executor.js --command=test && node ./cli/_utils/ci-utils/executor.js --command=lint-full && git add . && node ./cli/_utils/ci-utils/executor.js --command=check-types && node ./cli/_utils/ci-utils/executor.js --command=build
