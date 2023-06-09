import { IDefaultQuery } from "../interfaces/query.interface";

export const defaultQueryValues: IDefaultQuery = {
  limit: 24,
  offset: 0,
  page: 0,
  order: "DESC",
  orderBy: "created_at"
}
