import React from 'react';
import { ICookies } from '../_types';

export const CookiesContext: React.Context<ICookies> = React.createContext(
  null,
);
