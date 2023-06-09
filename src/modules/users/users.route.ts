import { Router } from 'express';
import { Routes } from '../shared/interfaces/routes.interface';
import validate from '../shared/middlewares/validate';
import UsersController from './users.controller';
import { CreateUserDTO, UpdateUserDTO } from './validation/users.validation';
import protect from '../shared/middlewares/auth/protect';
import check_access from '../shared/middlewares/auth/check_access';

export default class AuthRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Get All
    this.router.get(`${this.path}/`, protect, check_access('users', 'read'), this.usersController.getAll);

    // Get One
    this.router.get(`${this.path}/:id`, protect, check_access('users', 'read'), this.usersController.getOne);

    // Create
    this.router.post(
      `${this.path}/`,
      protect,
      check_access('users', 'create'),
      validate(CreateUserDTO, 'body'),
      this.usersController.create
    );

    // Update
    this.router.put(
      `${this.path}/:id`,
      protect,
      check_access('users', 'update'),
      validate(UpdateUserDTO, 'body', true),
      this.usersController.update
    );

    // Delete
    this.router.delete(`${this.path}/:id`, protect, check_access('users', 'delete'), this.usersController.delete);
  }
}
