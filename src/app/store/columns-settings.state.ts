import { Injectable } from '@angular/core';
import {
  Action,
  State,
  StateContext,
  createSelector,
} from '@ngxs/store';
import { TableSettings } from '../app.types';
import * as ColumnsSettingsActions from './column-setttings.actions';

interface ColumnsSettingsStateModel {
  [key: string]: TableSettings;
}

const initialState = {};

@State<ColumnsSettingsStateModel>({
  name: 'ColumnsSettingsState',
  defaults: initialState,
})
@Injectable()
export class ColumnsSettingsState {
  public static queryParams(settingsName: string) {
    return createSelector(
      [ColumnsSettingsState],
      (state: ColumnsSettingsStateModel) => {
        return state[settingsName]?.queryParams ?? {};
      }
    );
  }

  public static SettingsParams(settingsName: string) {
    return createSelector(
      [ColumnsSettingsState],
      (state: ColumnsSettingsStateModel) => {
        return state[settingsName].columnsSettings;
      }
    );
  }

  @Action(ColumnsSettingsActions.SetColumnsSettings)
  public setColumnsSettings(
    { patchState, getState }: StateContext<ColumnsSettingsStateModel>,
    { settings, settingsName }: ColumnsSettingsActions.SetColumnsSettings
  ): void {
    patchState({
      [settingsName]: {
        columnsSettings: settings,
        queryParams: getState()[settingsName]?.queryParams,
      },
    });
  }

  @Action(ColumnsSettingsActions.SetQueryParams)
  public setQueryParams(
    { patchState, getState }: StateContext<ColumnsSettingsStateModel>,
    { settingsName, queryParams }: ColumnsSettingsActions.SetQueryParams
  ): void {
    patchState({
      [settingsName]: {
        queryParams,
        columnsSettings: getState()[settingsName]?.columnsSettings,
      },
    });
  }
}
