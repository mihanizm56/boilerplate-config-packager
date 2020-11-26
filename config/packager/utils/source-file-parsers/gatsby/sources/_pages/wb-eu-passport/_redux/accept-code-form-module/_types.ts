import { acceptCodeFormModuleReducerName } from './constants';

export type AcceptCodeFormStorage = {
  externalError: string;
  isLoading: boolean;
  code: string;
};

export type AcceptCodeFormStoragePart = {
  [acceptCodeFormModuleReducerName]: AcceptCodeFormStorage;
};

export type AcceptParamsType = {
  notifyCode: string;
  device: string;
  version: string;
  token: string;
};
