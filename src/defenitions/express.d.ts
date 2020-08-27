import { Request } from 'express';
import Cookies from 'universal-cookie';

declare module 'express' {
  interface Request {
    universalCookies: Cookies
  }
}
