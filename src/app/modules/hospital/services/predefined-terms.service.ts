import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PredefinedTerm } from '../model/predefined-term.model';

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
}
