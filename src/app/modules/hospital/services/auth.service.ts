import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, lastValueFrom } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiHost: string = 'http://localhost:8080/';
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private jwtHelper: JwtHelperService
  ) {}

  async loginUser(loginUser: any): Promise<boolean> {
    try {
      const response = await lastValueFrom(this.authenticate(loginUser));

      if (response.accessToken) {
        this.addTokenToSessionStorage(response.accessToken, loginUser.email);
        return true;
      } else {
        return false;
      }
    } catch (error: any) {
      if (error.status === 403) {
        return false;
      } else {
        this.toastr.error('Error contacting backend', 'Error');
        throw error;
      }
    }
  }

  authenticate(loginUser: any): Observable<any> {
    return this.http.post<any>(this.apiHost + 'api/auth/login', loginUser, {
      headers: this.headers,
    });
  }

  addTokenToSessionStorage(token: string, email: string) {
    let tokenContent = this.decodeToken(token);
    if (tokenContent != null) {
      sessionStorage.setItem(
        'authorities',
        JSON.stringify(tokenContent.authorities)
      );
      sessionStorage.setItem('jwt', JSON.stringify(token));
      sessionStorage.setItem('email', JSON.stringify(email));
    }
  }

  decodeToken(token: string) {
    try {
      return this.jwtHelper.decodeToken(token);
    } catch (error) {
      return null;
    }
  }

  isUserLoggedIn() {
    let jwt = sessionStorage.getItem('jwt');
    if (typeof jwt != 'undefined' && jwt) {
      if (!this.isTokenExpired(jwt)) {
        return true;
      }
    }
    return false;
  }

  isTokenExpired(token: string) {
    const decodedToken = this.decodeToken(token);
    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(decodedToken.exp);
    return expirationDate < new Date();
  }

  logout() {
    sessionStorage.clear();
  }
}
