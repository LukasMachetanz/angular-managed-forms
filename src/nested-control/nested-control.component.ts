import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Output,
} from '@angular/core';
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

@Component({
  selector: 'app-nested-control',
  templateUrl: './nested-control.component.html',
  styleUrls: ['./nested-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NestedControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: NestedControlComponent,
      multi: true,
    },
  ],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class NestedControlComponent implements ControlValueAccessor, Validator {
  /**
   * A nested control always needs a touch event
   */
  @Output()
  public readonly touched = new EventEmitter<void>();

  readonly #blur$ = new Subject<void>();

  public writeValue(val: string): void {
    this.form.setValue(val);
  }

  public registerOnChange(fn: (val: string) => void): void {
    this.form.valueChanges.subscribe(fn);
  }

  public registerOnTouched(fn: () => void): void {
    this.#blur$.subscribe(() => {
      fn();
      this.touched.emit();
    });
  }

  public validate(): ValidationErrors | null {
    return this.form.valid ? null : { controlComponent: true };
  }

  protected onBlur(): void {
    this.#blur$.next();
  }

  protected form = new FormControl('');
}
