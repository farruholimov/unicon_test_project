import OrgsService from '../organizations/organizations.service';
import ProjectsService from '../projects/projects.service';
import UsersService from '../users/users.service';
import TasksService from '../tasks/tasks.service';
import { NextFunction, Request, Response } from 'express';
import ErrorResponse from '../shared/utils/errorResponse';

class RolesController {
  private orgsService = new OrgsService();
  private projectsService = new ProjectsService();
  private usersService = new UsersService();
  private tasksService = new TasksService();

  public statsAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const users_count = await this.usersService.countAll();
      const orgs_count = await this.orgsService.countAll();
      const projects_count = await this.projectsService.countAll();
      const tasks_count = await this.tasksService.countAll();

      res.status(200).json({
        success: true,
        data: {
          stats: {
            users_count,
            organizations_count: orgs_count,
            projects_count,
            tasks_count,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  };
  public statsOrg = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const org = await this.orgsService.getOne(id);

      if (!org) throw new ErrorResponse(400, 'Not Found!');

      const stats = {
        name: org.name,
        projects_count: org['projects_count'],
        tasks: {
          count: org['tasks_count'],
          new_count: org['new_tasks_count'],
          in_progress_count: org['progress_tasks_count'],
          finished_count: org['finished_tasks_count'],
        },
      };

      res.status(200).json({
        success: true,
        data: {
          stats,
        },
      });
    } catch (error) {
      next(error);
    }
  };
  public statsProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const project = await this.projectsService.getOne(id);

      if (!project) throw new ErrorResponse(400, 'Not Found!');

      const stats = {
        org_name: project['organization']['name'],
        name: project.name,
        tasks: {
          count: project['tasks_count'],
          new_count: project['new_tasks_count'],
          in_progress_count: project['progress_tasks_count'],
          finished_count: project['finished_tasks_count'],
        },
      };

      res.status(200).json({
        success: true,
        data: {
          stats,
        },
      });
    } catch (error) {
      next(error);
    }
  };
}

export default RolesController;
