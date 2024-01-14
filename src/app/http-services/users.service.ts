import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersListView } from '../components/editable-table/editable-table.types';
import { Observable } from 'rxjs';
import * as Endpoints from './endpoints';
import { QueryParams } from '../app.types';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private readonly http: HttpClient) {}

  public getUsersList({
    _page,
    _per_page,
  }: QueryParams): Observable<UsersListView> {
    return this.http.get<UsersListView>(Endpoints.GET_USERS_LIST, {
      params: {
        _page,
        _per_page,
      },
    });
  }
}
