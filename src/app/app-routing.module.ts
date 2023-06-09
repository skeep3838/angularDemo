import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PipeDemoComponent } from './pipe-demo/pipe-demo.component';

const routes: Routes = [
  // 表示该路由将匹配任何路径，包括空字符串。这意味着如果用户访问空字符串，将重定向到 /recipe 路径。
  { path: '', redirectTo: '/recipe', pathMatch: 'full' },
  { path: 'pipeDemo', component: PipeDemoComponent },
  { path: 'recipe', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule) },
  {path: 'shoppingList', loadChildren:()=>import('./shopping-list/shopping-list.module').then(m=>m.ShoppingListModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
