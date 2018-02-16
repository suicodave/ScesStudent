import { Injectable } from '@angular/core';
import { apiHeaders, apiUrl } from '../interfaces/global';
import { AuthService } from './auth.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ElectionService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  source = new Subject();

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

  vote(electionId, studentId, candidateId: Array<any>) {
    const body = {
      'election_id': electionId,
      'student_id': studentId,
      'candidate_id': candidateId
    };

    return this.http.post(apiUrl + `elections/vote`, body, {
      headers: apiHeaders.append('Authorization', `Bearer ${this.authService.checkToken()}`)
    });
  }

  myVotes(electionId, studentId) {

    return this.http.get(apiUrl + `elections/${electionId}/my-votes/${studentId}`, {
      headers: apiHeaders.append('Authorization', `Bearer ${this.authService.checkToken()}`)
    });
  }

  candidateStanding(electionId) {
    return this.http.get(apiUrl + `elections/${electionId}/standings`, {
      headers: apiHeaders.append('Authorization', `Bearer ${this.authService.checkToken()}`)
    });
  }





}
