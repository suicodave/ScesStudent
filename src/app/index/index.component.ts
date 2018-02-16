import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

declare var Pusher: any;
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  pusher;
  elections = [];
  addedElection;
  user;
  navLinks = [
    {
      name: '/home', label: 'Home'
    }
  ];

  constructor(private cd: ChangeDetectorRef, private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.getProfile();
    console.log(this.user);



  }

  signOut() {
    this.authService.signOut();
  }




}
