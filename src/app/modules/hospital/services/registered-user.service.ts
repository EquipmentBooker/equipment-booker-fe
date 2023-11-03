import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisteredUserService {
  apiHost: string = 'http://localhost:8080/';
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  createRegisteredUser(registeredUser: any): Observable<any> {
    return this.http.post<any>(
      this.apiHost + 'api/auth/register',
      registeredUser,
      {
        headers: this.headers,
      }
    );
  }
}
