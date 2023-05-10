import { Router } from 'express';

import UsersRoute from '../modules/users/users.route';
import RolesRoute from '../modules/roles/roles.route';
import OrgsRoute from '../modules/organizations/organizations.route';
import ProjectsRoute from '../modules/projects/projects.route';
import TasksRoute from '../modules/tasks/tasks.route';
import StatsRoute from '../modules/stats/stats.route';

const router = Router();

const usersRoute = new UsersRoute();
const rolesRoute = new RolesRoute();
const orgsRoute = new OrgsRoute();
const projectsRoute = new ProjectsRoute();
const tasksRoute = new TasksRoute();
const statsRoute = new StatsRoute();

router.use('/', usersRoute.router);
router.use('/', rolesRoute.router);
router.use('/', orgsRoute.router);
router.use('/', projectsRoute.router);
router.use('/', tasksRoute.router);
router.use('/', statsRoute.router);

export default router;
