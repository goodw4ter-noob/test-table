import { Injectable, signal } from '@angular/core';
import { LoadUsers } from '../store/table.actions';
import { Observable } from 'rxjs';
import 'reflect-metadata';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofActionCompleted, ofActionDispatched } from '@ngxs/store';

export const ACTIONS_TO_OBSERVE = [LoadUsers];

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class LoadingIndicationService {
  public isActionProcessed = signal<boolean>(false);

  constructor(private readonly action$: Actions) {
    this.startIndicator();
    this.endIndicator();
  }

  private startIndicator(): void {
    this.action$
      .pipe(untilDestroyed(this), ofActionDispatched(...ACTIONS_TO_OBSERVE))
      .subscribe(() => {
        this.isActionProcessed.set(true);
      });
  }

  private endIndicator(): void {
    this.action$
      .pipe(untilDestroyed(this), ofActionCompleted(...ACTIONS_TO_OBSERVE))
      .subscribe(() => {
        this.isActionProcessed.set(false);
      });
  }
}
