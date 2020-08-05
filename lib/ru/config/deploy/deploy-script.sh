#!/bin/bash
PREV_TAG=$(git describe --abbrev=0 --tags)
IFS='.'
read -ra ADDR <<<"$PREV_TAG"

LAST_INDEX=${ADDR[2]}

MAJOR_VERSION=0
MINOR_VERSION=0
PATCH_VERSION=$((LAST_INDEX + 1))

NEW_TAG="v${MAJOR_VERSION}.${MINOR_VERSION}.${PATCH_VERSION}"

git add "."
HUSKY_SKIP_HOOKS=1 git commit -m "update tag"

git tag "${NEW_TAG}"

git push --tags

echo -en ""
echo -en "Deployed tag: \e[40;1;42m $NEW_TAG \e[m\n"



