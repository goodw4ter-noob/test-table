import { QueryParams } from "../app.types";
import { IUser } from "../components/editable-table/editable-table.types";

export class LoadUsers {
  public static readonly type = '[Table] Load Users';
  constructor(public queryParams: QueryParams) {}
}

export class LoadUsersSuccess {
  public static readonly type = '[Table] Load Users Success';
  constructor(public payload: IUser[], public total: number) {}
}

export class LoadUsersFail {
  public static readonly type = '[Table] Load Users Fail';
}
