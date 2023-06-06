import { AuthService } from './../auth/auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, tap, take, exhaustMap } from "rxjs/operators";
import { RecipesService } from './../recipes/recipes-service';
import { Recipe } from '../recipes/recipe-model';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  recipeURL = 'https://angulardemo-574ac-default-rtdb.firebaseio.com/recipes.json';

  constructor(private http: HttpClient,
    private recipesService: RecipesService) { }
  error = new Subject<string>();

  // 儲存目前的食譜至firebase
  stargeRecipes() {
    const recipes = this.recipesService.getRecipes();
    // 如果Component須在response的內容做處理，可以直接return
    // return this.http.put('https://angulardemo-574ac-default-rtdb.firebaseio.com/recipes.json', recipes);
    this.http.put(this.recipeURL, recipes).subscribe(resp => {
      console.log(resp);
      alert('已儲存!');
    }, error => {
      this.error = error;
    });
  }

  // 拉回存在雲端的食譜
  fetchRecipes() {
    // 尋找最新的使用者資訊  
    return this.http.get<Recipe[]>(this.recipeURL)
    .pipe(
      // 將this.http.get<>()返回的資料做處理
      map(recipes => {
        return recipes.map(recipe => {
          // 若配方沒有值，設定為[]
          return { ...recipe, ingerdients: recipe.ingerdients ? recipe.ingerdients : [] };
        });
      }),
      // 透過觀察物件的方式，將fetch回來的食譜做設定
      tap(recipes => {
        this.recipesService.setRecipes(recipes);
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }
}
