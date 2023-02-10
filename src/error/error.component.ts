import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class ErrorComponent implements AfterContentInit {
  @Input()
  public controlName: string | undefined; // Or directly FormControl and nou atomatic retrieval

  constructor(private readonly formGroupDirective: FormGroupDirective) {}

  public ngAfterContentInit(): void {
    const control = this.formGroupDirective.form.get(this.controlName);
    console.log(control.errors);
  }
}
