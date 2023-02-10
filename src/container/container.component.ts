import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from '../error/error.component';
import { ControlComponent } from '../control/control.component';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, ControlComponent, ErrorComponent],
})
export class ContainerComponent {
  public readonly form = this.formBuilder.group({
    firstName: [''], // Validators.required
  });

  constructor(private readonly formBuilder: FormBuilder) {}
}
