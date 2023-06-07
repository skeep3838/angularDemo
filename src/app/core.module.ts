import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipesService } from './recipes/recipes-service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

@NgModule({

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
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
