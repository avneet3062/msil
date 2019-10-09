import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/providers/user';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/providers/alertService';
import { TostService } from 'src/app/providers/tost.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login = {};
  user = {
    userId: 't001',
    password: 'abc123'
  };
  token: string;
  password1: string;
  password2: string;
  forgetForm: any;
  forgetCLickEmailError: boolean;
  logging = false; // to diable the login btn while request is in progress
  forgetEmail: string;
  pwdMisMatch = false;

  constructor(
    private userService: User,
    private router: Router,
    private alertService: AlertService,
    private tost: TostService
  ) { }

  ngOnInit() { }

  verifyUser() {
    this.logging = true;
    console.log(this.user);

    this.userService.login(this.user).subscribe(
      (response: any) => {
        this.logging = false;
        this.router.navigate(['home']);
        this.tost.showNotificationSuccess(' Loging Successfuly');
      },
      (error: any) => {
        this.logging = false;
      }
    );
  }
  checkLogin() {

  }


  onError(error: any) {
    this.alertService.errorAlert(error.message);
  }
}
