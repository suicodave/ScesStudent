import { Injectable } from '@angular/core';
import { apiHeaders, apiUrl } from '../interfaces/global';
import { AuthService } from './auth.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ElectionService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  getCandidates(electionId) {
    return this.http.get(apiUrl + `elections/${electionId}/candidates`, {
      headers: apiHeaders.append('Authorization', `Bearer ${this.authService.checkToken()}`)
    });
  }

  getPosition(electionId) {
    return this.http.get(apiUrl + `elections/${electionId}/positions`, {
      headers: apiHeaders.append('Authorization', `Bearer ${this.authService.checkToken()}`)
    });
  }

  getOpenElection(schoolYearId, departmentId) {
    const params = new HttpParams()
      .set('school_year_id', schoolYearId.toString())
      .set('department_id', departmentId.toString());
    return this.http.get(apiUrl + `elections/opened`, {
      headers: apiHeaders.append('Authorization', `Bearer ${this.authService.checkToken()}`),
      params: params
    });
  }
  getPublishedElection(schoolYearId, departmentId) {
    const params = new HttpParams()
      .set('school_year_id', schoolYearId.toString())
      .set('department_id', departmentId.toString());
    return this.http.get(apiUrl + `elections/published`, {
      headers: apiHeaders.append('Authorization', `Bearer ${this.authService.checkToken()}`),
      params: params
    });
  }
  getElection(id) {

    return this.http.get(apiUrl + `elections/${id}`, {
      headers: apiHeaders.append('Authorization', `Bearer ${this.authService.checkToken()}`)
    });
  }



}
