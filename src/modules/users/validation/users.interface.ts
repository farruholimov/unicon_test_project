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
}

export interface IUpdateUser {
  name?: string;
  role?: number;
}

export interface ISelectUserFilters {
  role?: number;
}