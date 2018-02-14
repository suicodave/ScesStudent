import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { apiUrl, apiHeaders } from '../interfaces/global';
import { Router } from '@angular/router';
import * as cryptoJS from 'crypto-js';
@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {

  }


  signIn(email, password) {
    const body = {
      email: email,
      password: password
    };
    return this.http.post(apiUrl + 'users/login', body, {
      headers: apiHeaders,
    });
  }

  signOut() {
    localStorage.removeItem('auth');
    localStorage.removeItem('user');
    this.router.navigate(['auth']);
  }

  checkToken(): string | boolean {
    const token = localStorage.getItem('auth');
    if (token == null) {
      return false;
    }
    return token;
  }
  getProfile() {
    const token = localStorage.getItem('auth');
    const decryptUser = cryptoJS.AES.decrypt(localStorage.getItem('user'), token);
    const profile = JSON.parse(decryptUser.toString(cryptoJS.enc.Utf8));
    return profile;
  }

}
