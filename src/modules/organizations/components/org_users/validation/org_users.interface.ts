export interface IOrgUser {
  id: string;
  org_id: string;
  user_id: string;
  created_at: Date;
}

export interface ICreateOrgUser {
  org_id: string;
  user_id: string;
}
