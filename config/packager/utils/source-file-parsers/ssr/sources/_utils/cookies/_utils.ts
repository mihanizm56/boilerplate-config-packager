import { ICookies, CookieValueType } from './_types';

export const setCookieForYear = ({
  cookies,
  key,
  value,
  domain,
}: {
  cookies: ICookies;
  key: string;
  value: CookieValueType;
  domain?: string;
}) => {
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);

  cookies.set(key, value, {
    expires,
    path: '/',
    ...(domain ? { domain } : {}),
  });
};

export const setCookieForMonth = ({
  cookies,
  key,
  value,
  domain,
}: {
  cookies: ICookies;
  key: string;
  value: CookieValueType;
  domain?: string;
}) => {
  const expires = new Date();
  expires.setMonth(expires.getMonth() + 1);

  cookies.set(key, value, {
    expires,
    path: '/',
    ...(domain ? { domain } : {}),
  });
};
