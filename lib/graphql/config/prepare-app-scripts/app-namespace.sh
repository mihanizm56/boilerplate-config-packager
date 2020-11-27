#!/bin/bash

I18NEXT_NAMESPACE=$1

cat << _EOF_ > src/_constants/i18next/app-namespace.ts
export const appNamespace = '${I18NEXT_NAMESPACE}';
_EOF_

cat << _EOF_ > src/pages/home/_redux/ui-module/constants.ts
export const reducerUIName = '@${I18NEXT_NAMESPACE}/ui-state';
_EOF_