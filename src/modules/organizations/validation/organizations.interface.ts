export interface IOrg {
  id: string;
  name: string;
  created_by: string;
  created_at: Date;
}

export interface ICreateOrg {
  name: string;
  created_by?: string;
}

export interface IUpdateOrg {
  name?: string;
}
