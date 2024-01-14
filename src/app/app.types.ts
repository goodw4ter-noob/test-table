import { Observable } from 'rxjs';

export interface ColumnConfig {
  columnName: string;
  columnDef: string;
  cell: (data: any) => string;
  isVisible: boolean;
}

export type columnConfigParam = Pick<ColumnConfig, 'columnDef' | 'isVisible'>;

export interface QueryParams {
  _page: number;
  _per_page: number;
}

export interface TableSettings {
  queryParams: QueryParams;
  columnsSettings: columnConfigParam;
}

export interface columnConfigProvider {
  columns: ColumnConfig[];
}

export abstract class BaseDataService {
  public dataSource!: Observable<any>;
  public total!: Observable<number>;
  public abstract loadDataSource(queryParams: QueryParams): void;
}

export abstract class BaseColumnService {
  public abstract getColumns(): ColumnConfig[];
}
