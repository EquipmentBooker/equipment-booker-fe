import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PredefinedTerm } from '../model/predefined-term.model';
import { SchedulePredefinedTerm } from '../../dto/schedule-predefined-term';

@Injectable({
  providedIn: 'root',
})
export class PredefinedTermsService {
  apiHost: string = 'http://localhost:8080/';
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  getFreePredefinedTerms(companyId: number): Observable<PredefinedTerm[]> {
    return this.http.get<PredefinedTerm[]>(
      this.apiHost + 'api/predefined_terms/company/' + companyId,
      {
        headers: this.headers,
      }
    );
  }

  schedulePredefinedTerm(
    predefinedTerm: SchedulePredefinedTerm
  ): Observable<any> {
    return this.http.put<any>(
      this.apiHost +
        'api/predefined_terms/schedule/' +
        predefinedTerm.predefinedTerm.id,
      predefinedTerm,
      {
        headers: this.headers,
      }
    );
  }
}
