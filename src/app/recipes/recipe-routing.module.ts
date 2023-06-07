import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { RecipesComponent } from './recipes.component';
import { AuthGuardService } from '../auth/auth-guard.service';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeResoliverService } from './recipe-resoliver.service';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesDetailComponent } from './recipes-detail/recipes-detail.component';
const routes: Routes = [
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
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }
