import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponsedata, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error: string = '';

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

    // 將登入登出要做的同樣的事情統整起來
    let authObs: Observable<AuthResponsedata>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authService.signin(email, passward);
    } else {
      authObs = this.authService.signup(email, passward);
    }

    authObs.subscribe(
      respData => {
        console.log(respData);
        this.isLoading = false;
        this.error = '';
      }, error => {
        this.error = error;
        this.isLoading = false;
      }
    );
    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

}
