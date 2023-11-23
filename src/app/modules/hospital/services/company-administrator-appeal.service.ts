import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyAdministratorAppeal } from '../model/company-administrator-appeal.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyAdministratorAppealService {
  apiHost: string = 'http://localhost:8080/';
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  createAppeal(appeal: any): Observable<any> {
    return this.http.post<any>(
      this.apiHost + 'api/company_administrator_appeals',
      appeal,
      {
        headers: this.headers,
      }
    );
  }

  getAppeals(): Observable<CompanyAdministratorAppeal[]> {
    return this.http.get<CompanyAdministratorAppeal[]>(
      this.apiHost + 'api/company_administrator_appeals',
      {
        headers: this.headers,
      }
    );
  }

  createAnswerToAppeal(appeal: CompanyAdministratorAppeal): Observable<any> {
    return this.http.put<any>(
      this.apiHost +
        'api/company_administrator_appeals/' +
        appeal.id +
        '/answer',
      appeal,
      {
        headers: this.headers,
      }
    );
  }
}
