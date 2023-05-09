import { Router } from 'express';

import UsersRoute from '../modules/users/users.route';
import RolesRoute from '../modules/roles/roles.route';
import OrgsRoute from '../modules/organizations/organizations.route';

const router = Router();

const usersRoute = new UsersRoute();
const rolesRoute = new RolesRoute();
const orgsRoute = new OrgsRoute();

router.use('/', usersRoute.router);
router.use('/', rolesRoute.router);
router.use('/', orgsRoute.router);

export default router;
