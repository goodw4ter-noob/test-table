import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditableTableComponent } from './components/editable-table/editable-table.component';
import { UsersComponent } from './components/users/users.component';
import { SettingsDrawerComponent } from './components/settings-drawer/settings-drawer.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { StartPageComponent } from './components/start-page/start-page.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NgxsModule } from '@ngxs/store';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { ColumnsSettingsState } from './store/columns-settings.state';
import { TableState } from './store/table.state';
import { UserSettingsState } from './store/user-settings.state';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSpinModule } from 'ng-zorro-antd/spin';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    EditableTableComponent,
    UsersComponent,
    SettingsDrawerComponent,
    StartPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([ColumnsSettingsState, TableState, UserSettingsState]),
    NzTableModule,
    NzDividerModule,
    NzSpinModule,
    NzIconModule,
    NzLayoutModule,
    NzRadioModule,
    NzDrawerModule,
    NzSwitchModule,
    NzFormModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
