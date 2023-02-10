import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ControlComponent } from './control/control.component';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, ControlComponent],
})
export class ContainerComponent {
  public readonly form = this.formBuilder.group({
    firstName: [''], // Validators.required
  });

  constructor(private readonly formBuilder: FormBuilder) {}
}
