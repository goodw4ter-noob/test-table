import { AfterViewInit, Component, Inject, Input, OnInit } from '@angular/core';
import {
  COLUMNS_CONFIG_SERVICE,
  COLUMNS_SETTINGS_NAME,
  COLUMNS_SETTINGS_SERVICE,
  DATA_SERVICE,
  DEFAULT_QUERY_PARAMS,
} from './editable-table.constants';

import { Data } from '@angular/router';
import { Store } from '@ngxs/store';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { Observable, Subject, tap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  BaseDataService,
  QueryParams,
  columnConfigProvider,
} from '../../app.types';
import { UserSettingsState } from '../../store/user-settings.state';
import { ColumnsSettingsService } from '../../services/columns-settings.service';
import { ColumnsSettingsState } from '../../store/columns-settings.state';
import { SettingsDrawerComponent } from '../settings-drawer/settings-drawer.component';
import { SetQueryParams } from '../../store/column-setttings.actions';
import { NzTableSize } from 'ng-zorro-antd/table';

@UntilDestroy()
@Component({
    selector: 'app-editable-table',
    templateUrl: './editable-table.component.html',
    styleUrls: ['./editable-table.component.scss'],
    providers: [NzDrawerService],
    standalone: false
})
export class EditableTableComponent {
  @Input()
  public size!: NzTableSize;

  public checked = false;
  public loading = false;
  public indeterminate = false;
  public _pageSize = 10;
  private _currentPage = 0;
  private _fontSize = this.store.select(UserSettingsState.fontSize);
  public listOfCurrentPageData: readonly Data[] = [];
  public setOfCheckedId = new Set<number>();

  constructor(
    @Inject(DATA_SERVICE)
    public dataService: BaseDataService,
    @Inject(COLUMNS_CONFIG_SERVICE)
    public columnProvider: columnConfigProvider,
    @Inject(COLUMNS_SETTINGS_NAME)
    private columnsSettingsName: string,
    @Inject(COLUMNS_SETTINGS_SERVICE)
    private columnsSettingsService: ColumnsSettingsService,
    private readonly store: Store,
    private readonly drawerService: NzDrawerService
  ) {}

  public get fontSize(): Observable<string> {
    return this._fontSize;
  }

  public get pageSize(): number {
    return this._pageSize;
  }
  public set pageSize(_per_page: number) {
    this._pageSize = _per_page;
    const currentQueryParams = this.store.selectSnapshot(
      ColumnsSettingsState.queryParams(this.columnsSettingsName)
    );
    const newQueryParams: QueryParams = {
      ...DEFAULT_QUERY_PARAMS,
      ...currentQueryParams,
      _per_page,
    };
    this.onQueryParamChanges(newQueryParams);
  }

  public get currentPage(): number {
    return this._currentPage;
  }
  public set currentPage(page: number) {
    this._currentPage = page;
    const currentQueryParams = this.store.selectSnapshot(
      ColumnsSettingsState.queryParams(this.columnsSettingsName)
    );
    const newQueryParams: QueryParams = {
      ...DEFAULT_QUERY_PARAMS,
      ...currentQueryParams,
      _page: page,
    };
    this.onQueryParamChanges(newQueryParams);
  }

  public opendColumnsSettingsDrawer(): void {
    const columns = this.columnProvider.columns;

    this.drawerService.create({
      nzTitle: 'Настройки колонок',
      nzWidth: '320px',
      nzContent: SettingsDrawerComponent,
      nzContentParams: {
        settingsName: this.columnsSettingsName,
        columns,
      },
    });
  }

  public checkAll(e: any) {}
  public refreshStatus() {}

  public onAllChecked(checked: boolean): void {}

  public onQueryParamChanges(queryParams: QueryParams): void {
    this.setQueryParams(queryParams);
    this.dataService.loadDataSource(queryParams);
  }

  private setQueryParams(queryParams: QueryParams): void {
    this.store.dispatch(
      new SetQueryParams(this.columnsSettingsName, queryParams)
    );
  }

  public onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  public refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData.filter(
      ({ disabled }) => !disabled
    );
    this.checked = listOfEnabledData.every(({ id }) =>
      this.setOfCheckedId.has(id)
    );
    this.indeterminate =
      listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) &&
      !this.checked;
  }

  public updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }
}
