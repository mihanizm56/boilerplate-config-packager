#!/bin/bash

I18NEXT_NAMESPACE=$1

cat << _EOF_ > ./src/_constants/i18next/app-namespace.ts
export const appNamespace = '${I18NEXT_NAMESPACE}';
_EOF_



cat << _EOF_ > ./src/_constants/i18next/i18next-constants.ts
import i18next from 'i18next';
import { appNamespace } from '@/_constants/i18next/app-namespace';

export const backendErrorsSubnamespace = 'backend-errors';

export const requestTranslateFunction = (
  key: string,
  options: Record<string, any>,
) => i18next.t(`${appNamespace}:${backendErrorsSubnamespace}.${key}`, options);
_EOF_




