import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { APP_ROUTES_NAMES } from '../../app.constants';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
  standalone: false,
})
export class StartPageComponent {
  constructor(private readonly router: Router) {}

  public navigateToUsers(): void {
    void this.router.navigate(['/', APP_ROUTES_NAMES.usersTable]);
  }
}
