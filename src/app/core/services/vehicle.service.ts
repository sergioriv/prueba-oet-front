import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IVehicle } from '../../interfaces/vehicle';
import { ApiResponse } from '../../interfaces/api-response';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private urlBase = `${environment.apiUrlBase}/vehicles`;
  private reportUrl = `${environment.apiUrlBase}/report/vehicles`;

  constructor(private http: HttpClient) { }

  getVehicleResult(): Observable<ApiResponse<IVehicle[]>> {
    return this.http.get<ApiResponse<IVehicle[]>>(`${this.urlBase}`);
  }

  getVehicle(id: number): Observable<ApiResponse<IVehicle>> {
    return this.http.get<ApiResponse<IVehicle>>(`${this.urlBase}/${id}`);
  }

  createVehicle(driver: IVehicle): Observable<ApiResponse<IVehicle>> {
    return this.http.post<ApiResponse<IVehicle>>(`${this.urlBase}`, driver);
  }

  updateVehicle(driver: IVehicle, id: number) {
    return this.http.put<ApiResponse<IVehicle>>(`${this.urlBase}/${id}`, driver);
  }

  report(): string {
    return this.reportUrl;
  }
}
