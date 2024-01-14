import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { ColumnConfig, columnConfigParam } from '../../app.types';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-settings-drawer',
  templateUrl: './settings-drawer.component.html',
  styleUrls: ['./settings-drawer.component.scss'],
  standalone: false,
})
export class SettingsDrawerComponent implements OnInit {
  public settingsName!: string;
  public columns!: ColumnConfig[];
  public radioValue = 'A';

  public formGroup: FormGroup<{ [key: string]: FormControl<boolean> }> =
    new FormGroup({});

  private columnConfig: columnConfigParam[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly drawerRef: NzDrawerRef
  ) {}

  public ngOnInit(): void {
    this.buildForm();
    this.onValueChange();
  }

  private onValueChange(): void {
    this.formGroup.valueChanges.pipe(untilDestroyed(this)).subscribe((data) => {
      const res: columnConfigParam[] = Object.entries(data).map((item) => {
        return {
          columnDef: item[0],
          isVisible: item[1]!,
        };
      });

      this.columnConfig = res;
    });
  }

  private buildForm(): void {
    this.columns.forEach((column) => {
      this.formGroup.setControl(
        column.columnDef,
        this.fb.control(column.isVisible, { nonNullable: true })
      );
    });
  }
}
