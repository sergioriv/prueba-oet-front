import { Component } from '@angular/core';
import { ButtonModule, CardBodyComponent, CardComponent, CardHeaderComponent, FormModule, TableDirective } from '@coreui/angular';

@Component({
  templateUrl: 'dashboard.component.html',
  standalone: true,
  imports: [FormModule, ButtonModule, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective]
})
export class DashboardComponent {
  message = 'Bienvenido'
}
