interface ICookiesOptions {
  path?: string;
  expires?: number | Date;
  maxAge?: number;
  httpOnly?: boolean;
  domain?: string;
  sameSite?: boolean | string;
  secure?: boolean;
}

export type CookieValueType = string | number | boolean | Record<string, any>;

export interface ICookies {
  set(name: string, value: CookieValueType, opts?: ICookiesOptions): void;
  setAll(
    array: { name: string; value: CookieValueType; opts?: ICookiesOptions }[],
  ): void;
  get(name: string, opts?: ICookiesOptions): CookieValueType;
  getAll(opts?: ICookiesOptions): Record<string, CookieValueType>;
  remove(name: string, opts?: ICookiesOptions): void;
  removeAll(): void;
}
