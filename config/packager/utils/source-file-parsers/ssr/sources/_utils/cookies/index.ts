import { Response, Request } from 'express';
import Cookie from 'cookie-universal';

export const configureCookies = (req?: Request, res?: Response): any =>
  req && res ? Cookie(req, res) : Cookie();
