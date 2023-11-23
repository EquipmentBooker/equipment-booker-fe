import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SystemAdministrator } from '../model/system-administrator.model';

@Injectable({
  providedIn: 'root',
})
export class SystemAdministratorService {
  apiHost: string = 'http://localhost:8080/';
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  getSystemAdministratorByEmail(
    email: string
  ): Observable<SystemAdministrator> {
    return this.http.get<SystemAdministrator>(
      this.apiHost + 'api/system_administrators/email/' + email,
      {
        headers: this.headers,
      }
    );
  }
}
