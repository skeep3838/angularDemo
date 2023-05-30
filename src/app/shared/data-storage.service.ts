import { HttpClient } from '@angular/common/http';
import { RecipesService } from './../recipes/recipes-service';
import { Injectable } from '@angular/core';
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
    this.http.get<Recipe[]>(this.recipeURL).subscribe(recipes =>{
      this.recipesService.setRecipes(recipes);
    });
  }
}
