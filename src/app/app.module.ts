import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipesService } from './recipes/recipes-service';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { RecipesModule } from './recipes/recipes.module';
import { RecipeRoutingModule } from './recipes/recipe-routing.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';

//每個Module是獨立運作的，所以無法在這裡使用app.Module設定的內容
@NgModule({
  // 列表聲明位於位於程序中所有的Component, Pipe, Directive
  declarations: [
    AppComponent,
    HeaderComponentComponent,
    AuthComponent
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
    FormsModule,
    ReactiveFormsModule,
    // 導入自定義的Module
    RecipesModule,
    RecipeRoutingModule,
    ShoppingListModule,
    SharedModule
  ],

  // 定義要提供注入的所有Service
  // 也可以用@Injectable({providedIn: 'root'}) 來設定
  providers: [
    ShoppingListService,
    RecipesService,
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptorService, 
      multi: true // 允許多個攔截器
    }
  ],
  // 定義哪個組件在index中可以用，通常只會有一個根組件
  bootstrap: [AppComponent]
})
export class AppModule { }
