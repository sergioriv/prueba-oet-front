import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDriver } from '../../interfaces/driver';
import { ApiResponse } from '../../interfaces/api-response';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  private urlBase = `${environment.apiUrlBase}/drivers`;

  constructor(private http: HttpClient) { }

  getDriverResult(): Observable<ApiResponse<IDriver[]>> {
    return this.http.get<ApiResponse<IDriver[]>>(`${this.urlBase}`);
  }

  getDriver(id: number): Observable<ApiResponse<IDriver>> {
    return this.http.get<ApiResponse<IDriver>>(`${this.urlBase}/${id}`);
  }

  createDriver(driver: IDriver): Observable<ApiResponse<IDriver>> {
    return this.http.post<ApiResponse<IDriver>>(`${this.urlBase}/create`, driver);
  }

  updateDriver(driver: IDriver, id: number) {
    return this.http.put<ApiResponse<IDriver>>(`${this.urlBase}/${id}`, driver);
  }
}
