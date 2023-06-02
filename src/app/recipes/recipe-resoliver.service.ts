import { RecipesService } from './recipes-service';
import { DataStorageService } from './../shared/data-storage.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
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
