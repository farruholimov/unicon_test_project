import { NextFunction, Response } from 'express';
import ProjectsService from './tasks.service';
import { IAssignTask, ICreateTask, IUpdateTask } from './validation/tasks.interface';
import { RequestWithUser } from '../shared/interfaces/routes.interface';
import extractQuery from '../shared/utils/extractQuery';

class TasksController {
  public tasksService = new ProjectsService();

  public create = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { title, description, project_id, due_date, worker_user_id }: ICreateTask = req.body;
      const { user } = req;
      const data = await this.tasksService.create({
        title,
        description,
        project_id,
        due_date,
        worker_user_id,
        created_by: user.id,
      });

      res.status(201).json({
        success: true,
        data: {
          new_task: data,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const taskData: IUpdateTask = req.body;
      const { id } = req.params;
      const data = await this.tasksService.update(id, taskData);

      res.status(200).json({
        success: true,
        data: {
          updated_task: data,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  public assignToUser = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { task_id, user_id }: IAssignTask = req.body;
      const data = await this.tasksService.update(task_id, { worker_user_id: user_id });

      res.status(200).json({
        success: true,
        data: {
          updated_task: data,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  public finish = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const data = await this.tasksService.update(id, { status: 3 });

      res.status(200).json({
        success: true,
        data: {
          updated_task: data,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      await this.tasksService.deleteOne(id);

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

      const data = await this.tasksService.getAll(filters, sorts);

      res.status(200).json({
        success: true,
        data: {
          tasks: data,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  public getByUser = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { query } = req;
      const { user_id } = req.params;

      query['worker_user_id'] = user_id;

      const filters = extractQuery(query).filters;
      const sorts = extractQuery(query).sorts;

      const data = await this.tasksService.getAll(filters, sorts);

      res.status(200).json({
        success: true,
        data: {
          tasks: data,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  public getOne = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const data = await this.tasksService.getOne(id);

      res.status(200).json({
        success: true,
        data: {
          task: data,
        },
      });
    } catch (error) {
      next(error);
    }
  };
}

export default TasksController;
