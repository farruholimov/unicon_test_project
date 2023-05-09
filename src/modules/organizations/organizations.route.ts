import { Router } from 'express';
import { Routes } from '../shared/interfaces/routes.interface';
import validate from '../shared/middlewares/validate';
import OrgsController from './organizations.controller';
import { CreateOrgDTO, UpdateOrgDTO } from './validation/organizations.validation';
import protect from '../shared/middlewares/auth/protect';
import check_access from '../shared/middlewares/auth/check_access';

export default class AuthRoute implements Routes {
  public path = '/orgs';
  public router = Router();
  public orgsController = new OrgsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, protect, check_access('organizations', 'read'), this.orgsController.getAll);
    this.router.get(`${this.path}/:id`, protect, check_access('organizations', 'read'), this.orgsController.getOne);
    this.router.post(
      `${this.path}/`,
      protect,
      check_access('organizations', 'create'),
      validate(CreateOrgDTO, 'body'),
      this.orgsController.create
    );
    this.router.put(
      `${this.path}/:id`,
      protect,
      check_access('organizations', 'update'),
      validate(UpdateOrgDTO, 'body', true),
      this.orgsController.update
    );
    this.router.delete(
      `${this.path}/:id`,
      protect,
      check_access('organizations', 'delete'),
      this.orgsController.delete
    );
  }
}
