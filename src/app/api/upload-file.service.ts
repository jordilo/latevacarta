import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BACKEND_URL } from '../backend-url';

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {

  constructor(@Inject(BACKEND_URL) private backendUrl: string, private http: HttpClient) {
    // tslint:disable-next-line:no-console
    console.log(this.backendUrl);
  }

  public upload(type: string, accountId: string, file: any) {
    const formData = new FormData();
    formData.append('accountId', accountId);
    formData.append('file', file);
    const headers = new HttpHeaders({
      Accept: 'application/json',
    });
    return this.http.post(`${this.backendUrl}file/${type}`, formData, { headers });
  }
}
