import { Component } from '@angular/core';

@Component({
  selector: 'app-label-required',
  standalone: true,
  imports: [],
  template: `<aside class="text-danger font-bold d-inline ms-2">*</aside>`,
})
export class LabelRequiredComponent {}
