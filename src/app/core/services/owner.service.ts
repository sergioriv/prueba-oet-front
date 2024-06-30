import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOwner } from '../../interfaces/owner';
import { ApiResponse } from '../../interfaces/api-response';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  private urlBase = `${environment.apiUrlBase}/owners`;

  constructor(private http: HttpClient) { }

  getOwnerResult(): Observable<ApiResponse<IOwner[]>> {
    return this.http.get<ApiResponse<IOwner[]>>(`${this.urlBase}`);
  }

  getOwner(id: number): Observable<ApiResponse<IOwner>> {
    return this.http.get<ApiResponse<IOwner>>(`${this.urlBase}/${id}`);
  }

  createOwner(driver: IOwner): Observable<ApiResponse<IOwner>> {
    return this.http.post<ApiResponse<IOwner>>(`${this.urlBase}`, driver);
  }

  updateOwner(driver: IOwner, id: number) {
    return this.http.put<ApiResponse<IOwner>>(`${this.urlBase}/${id}`, driver);
  }
}
