#!/bin/bash

I18NEXT_NAMESPACE=$1

cat << _EOF_ > src/_constants/i18next/app-namespace.ts
export const appNamespace = '${I18NEXT_NAMESPACE}';
_EOF_
