import { NextFunction, Response } from 'express';
import OrgsService from './organizations.service';
import OrgUsersService from './components/org_users/org_users.service';
import { ICreateOrg, IUpdateOrg } from './validation/organizations.interface';
import { RequestWithUser } from '../shared/interfaces/routes.interface';
import extractQuery from '../shared/utils/extractQuery';

class OrgsController {
  public orgsService = new OrgsService();
  public orgUsersService = new OrgUsersService();

  public create = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name }: ICreateOrg = req.body;
      const { user } = req;
      const data = await this.orgsService.create({ name, created_by: user.id });

      res.status(201).json({
        success: true,
        data: {
          new_organization: data,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const orgData: IUpdateOrg = req.body;
      const { id } = req.params;
      const data = await this.orgsService.update(id, orgData);

      res.status(200).json({
        success: true,
        data: {
          updated_organization: data,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      await this.orgsService.deleteOne(id);

      res.status(200).json({
        success: true,
        message: 'Organization Permanently Deleted!',
      });
    } catch (error) {
      next(error);
    }
  };

  public addUser = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { org_id } = req.params;
      const { user_id } = req.body;

      await this.orgUsersService.create({ org_id, user_id });

      res.status(201).json({
        success: true,
        message: 'User Added Successfully!',
      });
    } catch (error) {
      next(error);
    }
  };

  public addUsers = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { org_id } = req.params;
      const { user_ids } = req.body;

      await this.orgUsersService.createMany(org_id, user_ids);

      res.status(201).json({
        success: true,
        message: 'Users Added Successfully!',
      });
    } catch (error) {
      next(error);
    }
  };

  public getAll = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { query } = req;
      const sorts = extractQuery(query).sorts;

      const data = await this.orgsService.getAll(sorts);

      res.status(200).json({
        success: true,
        data: {
          organizations: data,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  public getOne = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const data = await this.orgsService.getOne(id);

      res.status(200).json({
        success: true,
        data: {
          organization: data,
        },
      });
    } catch (error) {
      next(error);
    }
  };
}

export default OrgsController;
