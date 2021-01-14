import React from 'react';
import { ICookies } from '../_types';
import { CookiesContext } from './cookies-context';

export interface IWithCookies {
  cookies: ICookies;
}

export const withCookies = <P extends IWithCookies>(
  Component: React.ComponentType<P>,
): React.FunctionComponent => (props: any): React.ReactElement => (
  <CookiesContext.Consumer>
    {(cookies): JSX.Element => <Component {...props} cookies={cookies} />}
  </CookiesContext.Consumer>
);
