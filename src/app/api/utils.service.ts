import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND_URL } from '../backend-url';
import { InsertFullCatalog } from './utils';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {

  constructor(@Inject(BACKEND_URL) private backendUrl: string, private http: HttpClient) {
  }

  public convertExcel(file: any, businessId: string): Observable<InsertFullCatalog> {
    const formData = new FormData();
    formData.append('business_id', businessId);
    formData.append('file', file);
    const headers = new HttpHeaders({
      Accept: 'application/json',
    });
    return this.http.post<InsertFullCatalog>(`${this.backendUrl}catalog/upload`, formData, { headers });
  }
}
