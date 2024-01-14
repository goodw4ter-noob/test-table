import { Component, signal } from '@angular/core';
import {
  COLUMNS_CONFIG_SERVICE,
  COLUMNS_SETTINGS_NAME,
  COLUMNS_SETTINGS_SERVICE,
  DATA_SERVICE,
  DEFAULT_QUERY_PARAMS,
} from '../editable-table/editable-table.constants';
import { Store } from '@ngxs/store';
import {
  BaseColumnService,
  QueryParams,
  columnConfigProvider,
} from '../../app.types';
import { USERS_COLUMNS_SETTINGS_NAME } from '../../types/settings-name';
import { UsersDataService } from '../../services/users-data.service';
import { UsersColumnsService } from '../../services/users-columns.service';
import { ColumnsSettingsService } from '../../services/columns-settings.service';
import { ColumnsSettingsState } from '../../store/columns-settings.state';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, startWith } from 'rxjs';

const columnsFactory = (
  columnService: BaseColumnService
): columnConfigProvider => {
  return {
    columns: columnService.getColumns(),
  };
};

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [
    UsersDataService,
    UsersColumnsService,
    {
      provide: DATA_SERVICE,
      useExisting: UsersDataService,
    },
    {
      provide: COLUMNS_SETTINGS_NAME,
      useValue: USERS_COLUMNS_SETTINGS_NAME,
    },
    {
      provide: COLUMNS_SETTINGS_SERVICE,
      useClass: ColumnsSettingsService,
    },
    {
      provide: COLUMNS_CONFIG_SERVICE,
      useFactory: columnsFactory,
      deps: [UsersColumnsService],
    },
  ],
  standalone: false,
})
export class UsersComponent {
  private readonly queryParams = toSignal(
    this.store
      .select(ColumnsSettingsState.queryParams(USERS_COLUMNS_SETTINGS_NAME))
      .pipe(
        startWith({} as QueryParams),
        map((coreQueryParams) => ({
          ...DEFAULT_QUERY_PARAMS,
          ...coreQueryParams,
        }))
      )
  );

  constructor(
    private readonly usersDataService: UsersDataService,
    private readonly store: Store
  ) {}

  public ngOnInit(): void {
    this.usersDataService.loadDataSource(this.queryParams());
  }
}
