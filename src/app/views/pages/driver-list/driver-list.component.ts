import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DriverService } from '../../../core/services/driver.service';
import { catchError, EMPTY, Observable } from 'rxjs';
import { IDriver } from '../../../interfaces/driver';
import { ApiResponse } from '../../../interfaces/api-response';
import { ErrorMessageComponent } from '../../../components/error-message/error-message.component';
import { ButtonModule, CardBodyComponent, CardComponent, CardHeaderComponent, TableDirective } from '@coreui/angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-driver-list',
  standalone: true,
  imports: [AsyncPipe, RouterLink, ErrorMessageComponent, ButtonModule, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective],
  templateUrl: './driver-list.component.html',
  styleUrl: './driver-list.component.css'
})
export class DriverListComponent implements OnInit {
  title = "Conductores";
  drivers$!: Observable<ApiResponse<IDriver[]>>;
  public errorMessage!: string;
  constructor(private service: DriverService) {}

  ngOnInit(): void {
    this.drivers$ = this.service.getDriverResult()
      .pipe(catchError((error:string) => {
        this.errorMessage = error;
        return EMPTY;
      }));
  }
}
