import { Router, Request } from 'express';
import { IUser } from '../../users/interface/users.interface';

export interface Routes {
  path?: string;
  router: Router;
}

export interface RequestWithUser extends Request {
  user: IUser;
}