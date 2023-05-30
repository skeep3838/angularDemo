import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from "rxjs/operators";
import { RecipesService } from './../recipes/recipes-service';
import { Recipe } from '../recipes/recipe-model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  recipeURL = 'https://angulardemo-574ac-default-rtdb.firebaseio.com/recipes.json';

  constructor(private http: HttpClient,
    private recipesService: RecipesService) { }

  stargeRecipes() {
    const recipes = this.recipesService.getRecipes();
    // 如果Component須在response的內容做處理，可以直接return
    // return this.http.put('https://angulardemo-574ac-default-rtdb.firebaseio.com/recipes.json', recipes);
    this.http.put(this.recipeURL, recipes).subscribe(resp => {
      console.log(resp);
    });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.recipeURL)
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            // 確保若配方沒有值，設定為[]
            return { ...recipe, ingerdients: recipe.ingerdients ? recipe.ingerdients : [] };
          });
        }),
        // 透過觀察物件的方式進行一些處理 
        tap(recipes => {
          this.recipesService.setRecipes(recipes);
        })
      )
  }
}
