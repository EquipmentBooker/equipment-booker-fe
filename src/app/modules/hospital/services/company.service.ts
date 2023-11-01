import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../model/company.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  apiHost: string = 'http://localhost:8080/';
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.apiHost + 'api/companies', {
      headers: this.headers,
    });
  }

  findCompaniesByNameOrLocation(searchValue: string): Observable<Company[]> {
    return this.http.get<Company[]>(
      this.apiHost +
        `api/companies/findNameOrLocation?searchValue=${searchValue}`,
      {
        headers: this.headers,
      }
    );
  }

  findCompaniesByNameOrLocationAndGrade(
    searchValue: string,
    filterGradeValue: string
  ): Observable<Company[]> {
    return this.http.get<Company[]>(
      this.apiHost +
        `api/companies/findNameOrLocationAndGrade?searchValue=${searchValue}&filterGradeValue=${filterGradeValue}`,
      {
        headers: this.headers,
      }
    );
  }
}
