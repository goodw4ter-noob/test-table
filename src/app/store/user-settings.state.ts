import { Injectable } from '@angular/core';
import { Selector, State } from '@ngxs/store';

interface UserSettingsStateModel {
  fontSize: string;
  ellipsis: string;
}

const initialState: UserSettingsStateModel = {
  fontSize: '12px',
  ellipsis: 'all',
};

@State<UserSettingsStateModel>({
  name: 'UserSettingsState',
  defaults: initialState,
})
@Injectable()
export class UserSettingsState {
  @Selector()
  public static fontSize(store: UserSettingsStateModel): string {
    return store.fontSize;
  }

  @Selector()
  public static ellipsis(store: UserSettingsStateModel): string {
    return store.ellipsis;
  }
}
