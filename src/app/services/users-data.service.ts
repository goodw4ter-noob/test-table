import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { DEFAULT_QUERY_PARAMS } from '../components/editable-table/editable-table.constants';
import { Observable } from 'rxjs';
import { IUser } from '../components/editable-table/editable-table.types';
import { BaseDataService, QueryParams } from '../app.types';
import { TableState } from '../store/table.state';
import { LoadUsers } from '../store/table.actions';

@Injectable()
export class UsersDataService implements BaseDataService {
  @Select(TableState.users)
  public dataSource!: Observable<IUser[]>;

  @Select(TableState.total)
  public total!: Observable<number>;

  constructor(private readonly store: Store) {}

  public loadDataSource(queryParams: QueryParams = DEFAULT_QUERY_PARAMS): void {
    this.store.dispatch(new LoadUsers(queryParams));
  }
}
