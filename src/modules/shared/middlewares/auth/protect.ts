import { RequestWithUser } from '../../interfaces/routes.interface';
import UsersService from '../../../users/users.service';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { vars } from '../../../../config/conf';
import ErrorResponse from '../../utils/errorResponse';
import { IDecodedToken } from '../../interfaces/auth.interface';

const token = vars.token;

const protect = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const userService = new UsersService();
    /*
    let authToken = ""

    const authorization = req.headers.authorization
    
    if (authorization && authorization.startsWith("Bearer ")) authToken = authorization.split(" ")[1];
    else throw new ErrorResponse(401, "Please login in to get access")
    
    const decodedToken = verify(authToken, token.secret) as IDecodedToken;
    
    const user = await userService.getOne(decodedToken.user_id)
    
    if (!user) throw new ErrorResponse(404, "User does not exist")
    */

    const user = await userService.getByRole(1);
    req.user = user[0];
    next();
  } catch (error) {
    next(error);
  }
};

export default protect;
