import { RequestWithUser } from "../../interfaces/routes.interface";
import { NextFunction, Response } from "express";
import ErrorResponse from "../../utils/errorResponse";
import RoleAccessService from "src/modules/roles/role_access/role_access.service";


const check_access = (module: string, level: string) => {
  return async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { user } = req
      const roleAccessService = new RoleAccessService()

      const role_access = await roleAccessService.getByRoleModuleLevel({
        role_id: user.role,
        module,
        level
      })

      if (!role_access) throw new ErrorResponse(400, "Access denied!")
      next()

    } catch (error) {
      next(error)
    }
  }
}

export default check_access;