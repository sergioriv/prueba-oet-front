import { Component, OnInit } from '@angular/core';
import { ButtonModule, CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, FormModule, RowComponent } from '@coreui/angular';
import { LabelRequiredComponent } from '../../../components/label-required/label-required.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { VehicleService } from '../../../core/services/vehicle.service';
import { DriverService } from '../../../core/services/driver.service';
import { OwnerService } from '../../../core/services/owner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';
import { ApiResponse } from '../../../interfaces/api-response';
import { IDriver } from '../../../interfaces/driver';
import { AsyncPipe } from '@angular/common';
import { IOwner } from 'src/app/interfaces/owner';

@Component({
  selector: 'app-vehicle-form',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, RowComponent, ColComponent, FormModule, ButtonModule, CardComponent, CardHeaderComponent, CardBodyComponent, LabelRequiredComponent],
  templateUrl: './vehicle-form.component.html',
  styleUrl: './vehicle-form.component.scss'
})
export class VehicleFormComponent implements OnInit {
  title = 'Nuevo vehículo';
  vehicleFrom: FormGroup;
  vehicleEditingid!: number;
  public errorMessage!: string;

  drivers$!: Observable<ApiResponse<IDriver[]>>;
  owners$!: Observable<ApiResponse<IOwner[]>>;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private service: VehicleService,
    private serviceDriver: DriverService,
    private serviceOwner: OwnerService,
    private route: ActivatedRoute
  ) {
    this.vehicleFrom = this.fb.group({
      license_plate: new FormControl(''),
      color: new FormControl(''),
      make: new FormControl(''),
      is_private: new FormControl(''),
      driver: new FormControl(''),
      owner: new FormControl('')
    });

    // Api Drivers
    this.drivers$ = this.serviceDriver.getDriverResult()
    .pipe(catchError((error:string) => {
      this.errorMessage = error;
      return EMPTY;
    }));

    // Api Owners
    this.owners$ = this.serviceOwner.getOwnerResult()
    .pipe(catchError((error:string) => {
      this.errorMessage = error;
      return EMPTY;
    }));
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.getVehicle(Number.parseInt(id))
        .pipe(catchError((error:string) => {
          this.errorMessage = error;
          return EMPTY;
        }))
        .subscribe(response => {

          let vehicleEditing = response.data;
          this.vehicleEditingid = Number.parseInt(id);

          this.title = `Vehículo: ${vehicleEditing?.license_plate}`

          this.vehicleFrom.patchValue({
            color: vehicleEditing?.color,
            make: vehicleEditing?.make,
            is_private: vehicleEditing?.is_private,
            driver: vehicleEditing?.driver.id,
            owner: vehicleEditing?.owner.id
          })

        });
    }
  }

  onSubmit() {
    if (this.vehicleEditingid) {
      this.service.updateVehicle(this.vehicleFrom.value, this.vehicleEditingid).subscribe({
        next:() => {
          this.router.navigate(['/pages/vehicles'])
        }
      })
    }
      this.service.createVehicle(this.vehicleFrom.value).subscribe({
        next:() => {
          this.router.navigate(['/pages/vehicles'])
        }
      })
  }
}
