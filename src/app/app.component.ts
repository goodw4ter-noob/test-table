import { AfterViewInit, Component } from '@angular/core';
import { LoadingIndicationService } from './services/loading-indication.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: false
})
export class AppComponent {
  constructor(
    public readonly loadingIndicationService: LoadingIndicationService
  ) {}
}
