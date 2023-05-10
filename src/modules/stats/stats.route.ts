import { Router } from 'express';
import { Routes } from '../shared/interfaces/routes.interface';
import StatsController from './stats.controller';
import protect from '../shared/middlewares/auth/protect';
import check_access from '../shared/middlewares/auth/check_access';

export default class AuthRoute implements Routes {
  public path = '/stats';
  public router = Router();
  public stats = new StatsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, protect, check_access('stats_all', 'read'), this.stats.statsAll);
    this.router.get(`${this.path}/org/:id`, protect, check_access('stats_org', 'read'), this.stats.statsOrg);
    this.router.get(
      `${this.path}/project/:id`,
      protect,
      check_access('stats_project', 'read'),
      this.stats.statsProject
    );
  }
}
