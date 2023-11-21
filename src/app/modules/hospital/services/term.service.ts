import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Term } from '../model/term.model';
import { UpdateTerm } from '../../dto/update-term';
import { ScheduleTerm } from '../../dto/schedule-term';

@Injectable({
  providedIn: 'root',
})
export class TermService {
  apiHost: string = 'http://localhost:8080/';
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  getScheduledTermsByRegisteredUserId(
    registeredUserId: number
  ): Observable<Term[]> {
    return this.http.get<Term[]>(
      this.apiHost + 'api/terms/scheduled/registered-user/' + registeredUserId,
      {
        headers: this.headers,
      }
    );
  }

  cancelScheduledTerm(updatedTerm: UpdateTerm): Observable<any> {
    return this.http.put<any>(
      this.apiHost + 'api/terms/cancel/' + updatedTerm.id,
      updatedTerm,
      {
        headers: this.headers,
      }
    );
  }

  getFreeTermsByCompanyId(companyId: number): Observable<Term[]> {
    return this.http.get<Term[]>(
      this.apiHost + 'api/terms/free/company/' + companyId,
      {
        headers: this.headers,
      }
    );
  }

  scheduleFreeTerm(term: ScheduleTerm): Observable<any> {
    return this.http.put<any>(
      this.apiHost + 'api/terms/schedule/' + term.termId,
      term,
      {
        headers: this.headers,
      }
    );
  }
}
