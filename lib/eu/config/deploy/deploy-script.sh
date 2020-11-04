#!/bin/bash
source .env

git add "."
HUSKY_SKIP_HOOKS=1 git commit -m "update tag"

git tag "${TAG}"

git push --tags

echo -en ""
echo -en "Deployed tag: \e[40;1;42m $TAG \e[m\n"
