import { InjectionToken } from '@angular/core';
import {
  BaseDataService,
  QueryParams,
  columnConfigProvider,
} from '../../app.types';
import { ColumnsSettingsService } from '../../services/columns-settings.service';

export const DEFAULT_QUERY_PARAMS: QueryParams = {
  _page: 1,
  _per_page: 10,
};

export const DATA_SERVICE = new InjectionToken<BaseDataService>(
  'Base Data Service'
);
export const COLUMNS_CONFIG_SERVICE = new InjectionToken<columnConfigProvider>(
  'Columns Config Service'
);
export const COLUMNS_SETTINGS_NAME = new InjectionToken<string>(
  'Columns Settings Name'
);
export const COLUMNS_SETTINGS_SERVICE =
  new InjectionToken<ColumnsSettingsService>('Columns Settings Service');
