import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesDetailComponent } from './recipes/recipes-detail/recipes-detail.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { PipeDemoComponent } from './pipe-demo/pipe-demo.component';
import { RecipeResoliverService } from './recipes/recipe-resoliver.service';
import { AuthComponent } from './auth/auth.component';
import { AuthGuardService } from './auth/auth-guard.service';

const routes: Routes = [
  // 表示该路由将匹配任何路径，包括空字符串。这意味着如果用户访问空字符串，将重定向到 /recipe 路径。
  { path: '', redirectTo: '/recipe', pathMatch: 'full' },
  {
    path: 'recipe', component: RecipesComponent, 
    canActivate: [AuthGuardService],  // 會先判定是否授權，才有權限進入相關功能
    children: [
      // 有設定resolve: [RecipeResoliverService]，會先到RecipeResoliverService做資料處理
      // 再進行頁面元件載入
      { path: '', component: RecipeStartComponent, resolve: [RecipeResoliverService] },
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipesDetailComponent, resolve: [RecipeResoliverService] },
      { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResoliverService] }
    ]
  },
  { path: 'shoppingList', component: ShoppingListComponent },
  { path: 'pipeDemo', component: PipeDemoComponent },
  { path: 'auth', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
