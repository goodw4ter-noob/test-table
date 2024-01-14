import { Observable } from 'rxjs';

export interface ColumnConfig {
  columnName: string;
  columnDef: string;
  cell: (data: any) => string;
  isVisible: boolean;
}

export type columnConfigParam = Pick<ColumnConfig, 'columnDef' | 'isVisible'>;

export interface QueryParams {
  page: number;
  size: number;
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
