import { HttpClient } from '@angular/common/http';
import { RecipesService } from './../recipes/recipes-service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,
    private recipesService: RecipesService) { }

  stargeRecipes() {
    const recipes = this.recipesService.getRecipes();
    // 如果Component須在response的內容做處理，可以直接return
    // return this.http.put('https://angulardemo-574ac-default-rtdb.firebaseio.com/recipes.json', recipes);
    this.http.put('https://angulardemo-574ac-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(resp => {
      console.log(resp);
    });
  }
}
