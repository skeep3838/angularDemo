import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { AuthModule } from './auth/auth.module';
import { ShoppingListReducer } from './shopping-list/store/shopping-list.reducer';

//每個Module是獨立運作的，所以無法在這裡使用app.Module設定的內容
@NgModule({
  // 列表聲明位於位於程序中所有的Component, Pipe, Directive
  declarations: [
    AppComponent,
    HeaderComponentComponent
  ],

  // 將其他Module導入此Module中
  imports: [
    // 只能在app.Module裡使用
    // 除了ngIf, nfFor，也包含一般應用程序啟動工作， 只需運行一次
    // 其他地方要使用相關功能只能導入CommonModule
    BrowserModule,
    HttpClientModule,
    // 保存路由配置
    AppRoutingModule,
    // 告訴ngrx啟動時哪裡可以找到reducers
    StoreModule.forRoot({
      shoppingList: ShoppingListReducer
    }),
    // 導入自定義的Module
    SharedModule,
    CoreModule,
    AuthModule
  ],
  // 定義哪個組件在index中可以用，通常只會有一個根組件
  bootstrap: [AppComponent]
})
export class AppModule { }
