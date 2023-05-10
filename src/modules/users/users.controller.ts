import { NextFunction, Response } from 'express';
import UsersService from './users.service';
import { ICreateUser, IUpdateUser } from './validation/users.interface';
import { RequestWithUser } from '../shared/interfaces/routes.interface';
import extractQuery from '../shared/utils/extractQuery';

class UsersController {
  public usersService = new UsersService();

  public getAll = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { query } = req;
      const filters = extractQuery(query).filters;
      const sorts = extractQuery(query).sorts;

      const data = await this.usersService.getAll(filters, sorts);

      res.status(200).json({
        success: true,
        data: {
          users: data,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  public getOne = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const data = await this.usersService.getOne(id);

      res.status(200).json({
        success: true,
        data: {
          user: data,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, role }: ICreateUser = req.body;
      const { user } = req;
      const data = await this.usersService.create({ name, role, created_by: user.id });

      res.status(201).json({
        success: true,
        data: {
          new_user: data,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: IUpdateUser = req.body;
      const { id } = req.params;
      const data = await this.usersService.update(id, userData);

      res.status(200).json({
        success: true,
        data: {
          updated_user: data,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      await this.usersService.deleteOne(id);

      res.status(200).json({
        success: true,
        message: 'User Permanently Deleted!',
      });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
