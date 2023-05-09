import { Router } from 'express';

import UsersRoute from '../modules/users/users.route';
import RolesRoute from '../modules/roles/roles.route';

const router = Router();

const usersRoute = new UsersRoute();
const rolesRoute = new RolesRoute();

router.use('/', usersRoute.router);
router.use('/', rolesRoute.router);

export default router;
