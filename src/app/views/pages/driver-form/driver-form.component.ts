import { Component, OnInit } from '@angular/core';
import { ButtonModule, CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, FormModule, RowComponent } from '@coreui/angular';
import { LabelRequiredComponent } from '../../../components/label-required/label-required.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DriverService } from 'src/app/core/services/driver.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'app-driver-form',
  standalone: true,
  imports: [ReactiveFormsModule, RowComponent, ColComponent, FormModule, ButtonModule, CardComponent, CardHeaderComponent, CardBodyComponent, LabelRequiredComponent],
  templateUrl: './driver-form.component.html',
  styleUrl: './driver-form.component.scss'
})
export class DriverFormComponent implements OnInit {
  title = 'Nuevo conductor';
  driverFrom: FormGroup;
  driverEditingid!: number;
  public errorMessage!: string;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private service: DriverService,
    private route: ActivatedRoute
  ) {
    this.driverFrom = this.fb.group({
      document: new FormControl(''),
      first_name: new FormControl(''),
      second_name: new FormControl(''),
      last_names: new FormControl(''),
      city: new FormControl(''),
      address: new FormControl(''),
      phone: new FormControl('')
    })
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.getDriver(Number.parseInt(id))
        .pipe(catchError((error:string) => {
          this.errorMessage = error;
          return EMPTY;
        }))
        .subscribe(response => {

          let driverEditing = response.data;
          this.driverEditingid = Number.parseInt(id);

          this.title = `Conductor: ${driverEditing?.full_name}`

          this.driverFrom.patchValue({
            document: driverEditing?.document,
            first_name: driverEditing?.first_name,
            second_name: driverEditing?.second_name,
            last_names: driverEditing?.last_names,
            city: driverEditing?.city,
            address: driverEditing?.address,
            phone: driverEditing?.phone
          })

        });
    }
  }

  onSubmit() {
    if (this.driverEditingid) {
      this.service.updateDriver(this.driverFrom.value, this.driverEditingid).subscribe({
        next:() => {
          this.router.navigate(['/pages/drivers'])
        }
      })
    }
      this.service.createDriver(this.driverFrom.value).subscribe({
        next:() => {
          this.router.navigate(['/pages/drivers'])
        }
      })
  }
}
