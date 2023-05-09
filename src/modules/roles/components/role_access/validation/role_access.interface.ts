export interface IRoleAccess {
  id: number;
  role_id: number;
  module: string;
  level: string;
}

export interface ISelectRoleAccess {
  role_id: number;
  module: string;
  level: string;
}

export interface ICreateRoleAccess {
  role_id: number;
  module: string;
  level: string;
}