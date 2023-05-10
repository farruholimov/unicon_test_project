import { NextFunction, Response } from 'express';
import ProjectsService from './projects.service';
import { ICreateProject, IUpdateProject } from './validation/projects.interface';
import { RequestWithUser } from '../shared/interfaces/routes.interface';
import extractQuery from '../shared/utils/extractQuery';

class ProjectsController {
  public projectsService = new ProjectsService();

  public create = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, org_id }: ICreateProject = req.body;
      const { user } = req;
      const data = await this.projectsService.create({ name, org_id, created_by: user.id });

      res.status(201).json({
        success: true,
        data: {
          new_project: data,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const projectData: IUpdateProject = req.body;
      const { id } = req.params;
      const data = await this.projectsService.update(id, projectData);

      res.status(200).json({
        success: true,
        data: {
          updated_project: data,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      await this.projectsService.deleteOne(id);

      res.status(200).json({
        success: true,
        message: 'Project Permanently Deleted!',
      });
    } catch (error) {
      next(error);
    }
  };

  public getAll = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { query } = req;
      const filters = extractQuery(query).filters;
      const sorts = extractQuery(query).sorts;

      const data = await this.projectsService.getAll(filters, sorts);

      res.status(200).json({
        success: true,
        data: {
          projects: data,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  public getOne = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const data = await this.projectsService.getOne(id);

      res.status(200).json({
        success: true,
        data: {
          project: data,
        },
      });
    } catch (error) {
      next(error);
    }
  };
}

export default ProjectsController;
