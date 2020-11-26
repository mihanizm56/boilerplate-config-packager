export type LoginFormStorage = {
  externalError: string;
  isLoading: boolean;
  phone: string;
};

export type LoginFormStoragePart = {
  '@wb-passport/login-form-module': LoginFormStorage;
};
