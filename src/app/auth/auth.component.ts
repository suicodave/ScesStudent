import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import * as cryptoJS from 'crypto-js';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authForm: FormGroup;
  redirectTo = '';
  // tslint:disable-next-line:max-line-length
  constructor(private snackbar: MatSnackBar, private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.initForm();
    this.redirectIfAuthenticated();
  }

  initForm() {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  signIn() {
    if (this.authForm.invalid) {
      return;
    }
    const email = this.authForm.value.email;
    const pass = this.authForm.value.password;

    this.authService.signIn(email, pass).subscribe(
      (res: any) => {
        localStorage.setItem('auth', res.token);
        const userString = JSON.stringify(res.profile);
        const encryptUser = cryptoJS.AES.encrypt(userString, res.token);
        localStorage.setItem('user', encryptUser);
        this.router.navigate(['']);
      },
      (err) => {
        this.snackbar.open(err.error.message, 'Okay', {
          duration: 5000
        });

      }
    );

  }

  redirectIfAuthenticated() {

    const token = this.authService.checkToken();

    if (token != false) {
      this.router.navigate(['']);
      console.log('redirected');

    }

  }



}
