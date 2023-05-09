import RolesService from './roles.service';
import { NextFunction, Request, Response } from 'express';

class RolesController {
  public rolesService = new RolesService();

  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.rolesService.getAll();

      res.status(200).json({
        success: true,
        data: {
          roles: data,
        },
      });
    } catch (error) {
      next(error);
    }
  };
  public getOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const data = await this.rolesService.getOne(Number(id));

      res.status(200).json({
        success: true,
        data: {
          role: data,
        },
      });
    } catch (error) {
      next(error);
    }
  };
}

export default RolesController;
