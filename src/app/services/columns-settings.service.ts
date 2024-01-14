import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { ColumnsSettingsState } from '../store/columns-settings.state';
import { COLUMNS_SETTINGS_NAME } from '../components/editable-table/editable-table.constants';

@Injectable({
  providedIn: 'root',
})
export class ColumnsSettingsService {
  constructor(
    @Inject(COLUMNS_SETTINGS_NAME)
    private readonly columnSettingsName: string,
    private readonly store: Store
  ) {}
}
