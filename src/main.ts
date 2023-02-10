import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { ContainerComponent } from './container/container.component';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, ContainerComponent],
  template: '<app-container></app-container>',
})
export class App {}

bootstrapApplication(App);
