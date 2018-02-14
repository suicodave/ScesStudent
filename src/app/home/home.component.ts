import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as cryptoJS from 'crypto-js';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  viewElection(election) {
    const decodeKey = this.authService.checkToken();
    if (decodeKey != false) {
      const item = cryptoJS.AES.encrypt(JSON.stringify(election), decodeKey);
      localStorage.setItem('election', item);
      this.router.navigate(['/election']);
    }

  }

}
