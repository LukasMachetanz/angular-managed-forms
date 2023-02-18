import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { ErrorComponent } from '../error/error.component';
import { NestedControlComponent } from '../nested-control/nested-control.component';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: ControlComponent,
      multi: true,
    },
  ],
  standalone: true,
  imports: [ReactiveFormsModule, NestedControlComponent, ErrorComponent],
})
export class ControlComponent implements ControlValueAccessor, Validator {
  readonly #blur$ = new Subject<void>();

  public writeValue(val: string): void {
    this.form.setValue(val);
  }

  public registerOnChange(fn: (val: string) => void): void {
    this.form.valueChanges.subscribe(fn);
  }

  public registerOnTouched(fn: () => void): void {
    this.#blur$.subscribe(fn);
  }

  public validate(): ValidationErrors | null {
    return this.form.valid ? null : { controlComponent: true };
  }

  protected onBlur(): void {
    this.#blur$.next();
  }

  protected form = new FormControl('');
}
