import { Router } from 'express';
import { Routes } from '../shared/interfaces/routes.interface';
import validate from '../shared/middlewares/validate';
import ProjectsController from './projects.controller';
import { CreateProjectDTO, UpdateProjectDTO } from './validation/projects.validation';
import protect from '../shared/middlewares/auth/protect';
import check_access from '../shared/middlewares/auth/check_access';

export default class AuthRoute implements Routes {
  public path = '/projects';
  public router = Router();
  public projectsController = new ProjectsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, protect, check_access('projects', 'read'), this.projectsController.getAll);
    this.router.get(`${this.path}/:id`, protect, check_access('projects', 'read'), this.projectsController.getOne);
    this.router.post(
      `${this.path}/`,
      protect,
      check_access('projects', 'create'),
      validate(CreateProjectDTO, 'body'),
      this.projectsController.create
    );
    this.router.put(
      `${this.path}/:id`,
      protect,
      check_access('projects', 'update'),
      validate(UpdateProjectDTO, 'body'),
      this.projectsController.update
    );
    this.router.delete(`${this.path}/:id`, protect, check_access('projects', 'delete'), this.projectsController.delete);
  }
}
