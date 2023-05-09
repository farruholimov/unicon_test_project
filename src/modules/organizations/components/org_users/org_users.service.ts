import { ICreateOrgUser, IOrgUser } from './validation/org_users.interface';
import OrgUsersDao from './dao/org_users.dao';
import ErrorResponse from '../../../shared/utils/errorResponse';

export default class OrgUserService {
  private orgUsersDao = new OrgUsersDao();
  async create({ org_id, user_id }: ICreateOrgUser): Promise<IOrgUser> {
    const data = await this.orgUsersDao.create({ org_id, user_id });
    if (!data) throw new ErrorResponse(404, 'Failed to Create!');
    return data;
  }
  async getAll(): Promise<IOrgUser[]> {
    return await this.orgUsersDao.selectAll();
  }
  async getByUser(user_id: string): Promise<IOrgUser[]> {
    return await this.orgUsersDao.selectByUser(user_id);
  }
  async getByOrg(org_id: string): Promise<IOrgUser[]> {
    return await this.orgUsersDao.selectByOrg(org_id);
  }
  async getByOrgUser(org_id: string, user_id: string): Promise<IOrgUser[]> {
    return await this.orgUsersDao.selectByOrgUser(org_id, user_id);
  }
  async deleteBy(column_name: string, value: string): Promise<void> {
    await this.orgUsersDao.delete(column_name, value);
  }
  async deleteByOrgUser(org_id: string, user_id: string): Promise<void> {
    await this.orgUsersDao.deleteByOrgUser(org_id, user_id);
  }
}
