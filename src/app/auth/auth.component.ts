import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {

  isLoginMode = true;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const passward = form.value.password;

    if (this.isLoginMode) {
      this.authService.signin(email, passward).subscribe(
        respData => {
          console.log(respData);
        }, error => {
          console.log(error);
        });
    } else {
      this.authService.signup(email, passward).subscribe(
        respData => {
          console.log(respData);
        }, error => {
          console.log(error);
        }
      );
    }
    form.reset();
  }

}
