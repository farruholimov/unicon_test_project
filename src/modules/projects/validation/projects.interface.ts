export interface IProject {
  id: string;
  name: string;
  org_id: string;
  created_by: string;
  created_at: Date;
}

export interface ICreateProject {
  name: string;
  org_id?: string;
  created_by?: string;
}

export interface IProjectFilter {
  org_id?: string;
  created_by?: string;
}

export interface IUpdateProject {
  name: string;
}
