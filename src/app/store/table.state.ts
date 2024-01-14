import { Injectable } from '@angular/core';
import { State, StateContext, Action, Selector, Store } from '@ngxs/store';
import {
  IUser,
  UsersListView,
} from '../components/editable-table/editable-table.types';
import * as TableActions from './table.actions';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { GET_USERS_LIST } from '../http-services/endpoints';
import { UsersService } from '../http-services/users.service';

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

  constructor(private readonly usersService: UsersService) {}

  @Action(TableActions.LoadUsers)
  public loadUsers(
    { dispatch, patchState }: StateContext<EditableTableStateModel>,
    { queryParams }: TableActions.LoadUsers
  ): Observable<UsersListView> {
    return this.usersService.getUsersList(queryParams).pipe(
      tap(({ data: users, items }) => patchState({ users, total: items ?? 0 })),
      catchError((err: unknown) => {
        dispatch(new TableActions.LoadUsersFail());

        return throwError(() => err);
      })
    );
  }
}
