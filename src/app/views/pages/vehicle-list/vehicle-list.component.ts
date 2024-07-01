import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../../core/services/vehicle.service';
import { catchError, EMPTY, Observable } from 'rxjs';
import { IVehicle } from '../../../interfaces/vehicle';
import { ApiResponse } from '../../../interfaces/api-response';
import { ErrorMessageComponent } from '../../../components/error-message/error-message.component';
import { ButtonModule, CardBodyComponent, CardComponent, CardHeaderComponent, TableDirective } from '@coreui/angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [AsyncPipe, RouterLink, ErrorMessageComponent, ButtonModule, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective],
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.css'
})
export class VehicleListComponent implements OnInit {
  title = "Vehículos";
  vehicles$!: Observable<ApiResponse<IVehicle[]>>;
  public errorMessage!: string;
  constructor(
    private service: VehicleService,
  ) {}

  ngOnInit(): void {
    this.vehicles$ = this.service.getVehicleResult()
      .pipe(catchError((error:string) => {
        this.errorMessage = error;
        return EMPTY;
      }));
  }

  reportDownload() {
    window.location.href = this.service.report();
  }
}
