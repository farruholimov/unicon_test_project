import { Router } from 'express';
import { Routes } from '../shared/interfaces/routes.interface';
import validate from '../shared/middlewares/validate';
import TasksController from './tasks.controller';
import { AssignTaskDTO, CreateTaskDTO, UpdateTaskDTO } from './validation/tasks.validation';
import protect from '../shared/middlewares/auth/protect';
import check_access from '../shared/middlewares/auth/check_access';

export default class AuthRoute implements Routes {
  public path = '/tasks';
  public router = Router();
  public tasksController = new TasksController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Get All
    this.router.get(`${this.path}/`, protect, check_access('tasks', 'read'), this.tasksController.getAll);

    // Get By User
    this.router.get(
      `${this.path}/staff/:user_id`,
      protect,
      check_access('tasks', 'read'),
      this.tasksController.getByUser
    );

    // Get One
    this.router.get(`${this.path}/:id`, protect, check_access('tasks', 'read'), this.tasksController.getOne);

    // Create
    this.router.post(
      `${this.path}/`,
      protect,
      check_access('tasks', 'create'),
      validate(CreateTaskDTO, 'body'),
      this.tasksController.create
    );

    // Assign To User
    this.router.put(
      `${this.path}/assign`,
      protect,
      check_access('tasks', 'update'),
      validate(AssignTaskDTO, 'body'),
      this.tasksController.assignToUser
    );

    // Set Status As Finished
    this.router.put(`${this.path}/finish/:id`, protect, check_access('tasks', 'update'), this.tasksController.finish);

    // Update
    this.router.put(
      `${this.path}/:id`,
      protect,
      check_access('tasks', 'update'),
      validate(UpdateTaskDTO, 'body', true),
      this.tasksController.update
    );

    // Delete
    this.router.delete(`${this.path}/:id`, protect, check_access('tasks', 'delete'), this.tasksController.delete);
  }
}
