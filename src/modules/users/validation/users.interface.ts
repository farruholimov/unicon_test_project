export interface IUser {
  id: string;
  name: string;
  role: number;
  created_by: string;
  created_at: Date;
}

export interface ICreateUser {
  name: string;
  role: number;
  created_by?: string;
}

export interface IUpdateUser {
  name?: string;
  role?: number;
}

export interface IUserFilter {
  role?: number;
  org_id?: string;
}
