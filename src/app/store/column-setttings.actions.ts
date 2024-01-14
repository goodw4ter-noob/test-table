import { QueryParams, TableSettings, columnConfigParam } from '../app.types';

export class SetQueryParams {
  public static readonly type = '[Params] Set Query Params';
  constructor(public settingsName: string, public queryParams: QueryParams) {}
}

export class SetColumnsSettings {
  public static readonly type = '[ColumnsSettings] Set Columns Settings';
  constructor(
    public settingsName: string,
    public settings: columnConfigParam
  ) {}
}
