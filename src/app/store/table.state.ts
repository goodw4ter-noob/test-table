import { Injectable } from '@angular/core';
import { State, StateContext, Action, Selector, Store } from '@ngxs/store';
import { IUser } from '../components/editable-table/editable-table.types';
import * as TableActions from './table.actions';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';

export interface EditableTableStateModel {
  users: IUser[];
  total: number;
}

const initialState: EditableTableStateModel = {
  users: [],
  total: 0,
};

@State<EditableTableStateModel>({
  name: 'TableState',
  defaults: initialState,
})
@Injectable()
export class TableState {
  @Selector()
  public static users(store: EditableTableStateModel): IUser[] {
    return store.users;
  }

  @Selector()
  public static total(store: EditableTableStateModel): number {
    return store.total;
  }

  constructor(private readonly http: HttpClient) {}

  @Action(TableActions.LoadUsers)
  public loadUsers(
    { dispatch }: StateContext<EditableTableStateModel>,
    { queryParams }: TableActions.LoadUsers
  ): Observable<HttpResponse<IUser[]>> {
    return this.http
      .get<IUser[]>('http://localhost:3000/data', {
        params: {
          _page: queryParams.page,
          _limit: queryParams.size,
        },
        observe: 'response',
      })
      .pipe(
        tap((data) => {
          const total = data.headers.get('X-Total-Count');
          dispatch(
            new TableActions.LoadUsersSuccess(
              data.body ?? [],
              parseInt(total ?? '63')
            )
          );
        }),
        catchError((err: unknown) => {
          dispatch(new TableActions.LoadUsersFail());

          return throwError(() => err);
        })
      );
  }

  @Action(TableActions.LoadUsersSuccess)
  public loadUsersSuccess(
    { patchState }: StateContext<EditableTableStateModel>,
    { payload, total }: TableActions.LoadUsersSuccess
  ) {
    patchState({
      users: payload,
      total,
    });
  }
}
