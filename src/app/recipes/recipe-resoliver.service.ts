import { RecipesService } from './recipes-service';
import { DataStorageService } from './../shared/data-storage.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// 在路由定義中透過 resolve 屬性物件來指定 Resolve 服務，
// Angular 會先利用此服務取得資料後，才進行頁面元件的載入。
export class RecipeResoliverService implements Resolve<Recipe[]>{

  constructor(private dataStorageService: DataStorageService,
    private recipesService: RecipesService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    const recipes = this.recipesService.getRecipes();
    // 若沒有recipes，則重新載入資料
    if(recipes.length===0){
      return this.dataStorageService.fetchRecipes();
    }else{
      return recipes;
    }
  }
}
