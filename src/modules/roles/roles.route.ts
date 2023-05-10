import { Router } from 'express';
import { Routes } from '../shared/interfaces/routes.interface';
import RolesController from './roles.controller';
import protect from '../shared/middlewares/auth/protect';
import check_access from '../shared/middlewares/auth/check_access';

export default class RolesRoute implements Routes {
  public path = '/roles';
  public router = Router();
  public rolesController = new RolesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Get All
    this.router.get(`${this.path}/`, protect, check_access('roles', 'read'), this.rolesController.getAll);
    // Get One
    this.router.get(`${this.path}/:id`, protect, check_access('roles', 'read'), this.rolesController.getOne);
  }
}
