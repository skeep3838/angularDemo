import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import * as fromApp from '../store/app.reducer'
import * as AuthAction from './store/auth.action'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {

  isLoginMode = true;
  isLoading = false;  // Loading動畫
  error: string = '';
  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective; // 錯誤訊息視圖容器
  private closeSub: Subscription;
  private storeSub: Subscription;

  constructor(private authService: AuthService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
    if(this.storeSub){
      this.storeSub.unsubscribe();
    }
  }

  ngOnInit() {
    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.error = authState.authError;
      this.isLoading = authState.loading;
      if (this.error) {
        this.showErrorAlert(this.error);
      }
    })
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

    this.isLoading = true;
    if (this.isLoginMode) {
      this.store.dispatch(new AuthAction.LoginStart({ email: email, password: passward }));
    } else {
     this.store.dispatch(new AuthAction.SignupStart({ email: email, password: passward }));
    }
    form.reset();
  }

  onHandleError() {
    this.store.dispatch(new AuthAction.ClearError());
  }

  private showErrorAlert(message: string) {
    // const alertComp = new AlertComponent();  //不是有效的Angular使用方式
    // 透過componentFactoryResolver讓Angular去尋找該組建
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    // 告訴Angular要在哪裡加component，使用視圖容器ref，，可說是指向dom某個位置的指針
    // 試圖容器不僅是個座標，請可以與dom進行互動，clear()可以將之前渲染過的內容清理乾淨
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    // 建造新的組件
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    // 訪問Component裡的內容
    componentRef.instance.message = message;
    // 當要手動訂閱某個東西時，通常會想用Subject，但用ComponentFactory可以直接使用事件發射器定直接subject
    // 訂閱AlertComponent 內的close參數，做關閉視窗操作
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

}
