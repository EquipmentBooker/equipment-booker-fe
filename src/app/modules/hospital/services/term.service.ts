import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Term } from '../model/term.model';

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
}
