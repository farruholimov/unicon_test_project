import { Router } from 'express';
import { Routes } from '../shared/interfaces/routes.interface';
import validate from '../shared/middlewares/validate';
import UsersController from './users.controller';
import { CreateUserDTO, UpdateUserDTO } from './validation/users.validation';

export default class AuthRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, this.usersController.getAll);
    this.router.get(`${this.path}/:id`, this.usersController.getOne);
    this.router.post(`${this.path}/`, validate(CreateUserDTO, 'body'), this.usersController.create);
    this.router.put(`${this.path}/:id`, validate(UpdateUserDTO, 'body', true), this.usersController.update);
    this.router.delete(`${this.path}/:id`, this.usersController.delete);
  }
}
