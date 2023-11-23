import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyAppeal } from '../model/company-appeal.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyAppealService {
  apiHost: string = 'http://localhost:8080/';
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  createAppeal(appeal: any): Observable<any> {
    return this.http.post<any>(this.apiHost + 'api/appeals', appeal, {
      headers: this.headers,
    });
  }

  getAppeals(): Observable<CompanyAppeal[]> {
    return this.http.get<CompanyAppeal[]>(this.apiHost + 'api/appeals', {
      headers: this.headers,
    });
  }

  createAnswerToAppeal(appeal: CompanyAppeal): Observable<any> {
    return this.http.put<any>(
      this.apiHost + 'api/appeals/' + appeal.id + '/answer',
      appeal,
      {
        headers: this.headers,
      }
    );
  }
}
