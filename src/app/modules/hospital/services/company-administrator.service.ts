import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompanyAdministrator } from '../model/company-administrator.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompanyAdministratorService {
  apiHost: string = 'http://localhost:8080/';
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  getCompanyAdministratorByEmail(
    email: string
  ): Observable<CompanyAdministrator> {
    return this.http.get<CompanyAdministrator>(
      this.apiHost + 'api/company_administrators/email/' + email,
      {
        headers: this.headers,
      }
    );
  }
}
