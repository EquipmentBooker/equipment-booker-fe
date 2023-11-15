import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = JSON.parse(sessionStorage.getItem('jwt') as string);

    if (!token) {
      return next.handle(req);
    }

    const reqWithAuth = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${token}`),
    });

    return next.handle(reqWithAuth);
  }
}
