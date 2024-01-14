import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_ROUTES_NAMES } from './app.constants';
import { StartPageComponent } from './components/start-page/start-page.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: StartPageComponent,
  },
  {
    path: APP_ROUTES_NAMES.usersTable,
    component: UsersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
