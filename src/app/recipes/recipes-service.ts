import { Injectable } from '@angular/core';
import { Recipe } from './recipe-model';
import { Ingerdient } from '../shared/ingerdient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

// 'self':表示该组件或类将直接被注入到其所在的模块的提供者中。
// 'root':表示该组件或类将被注入到 Angular 的根提供者中。
// 'component':表示该组件或类将被注入到一个组件的提供者中。
// 'service':表示该组件或类将被注入到一个服务的提供者中。
// 'query':表示该组件或类将被注入到一个查询的提供者中。
// 'static':表示该组件或类将被注入到一个静态提供者中。
// 需要注意的是，providedIn 属性的值必须是一个大写字母或下划线开头的字符串，并且只能包含字母、数字和下划线。如果 providedIn 属性的值不被正确设置，则 Angular 将抛出一个错误。
@Injectable()
export class RecipesService {
  recipeChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Test1', 'This Description 1!', 'https://tokyo-kitchen.icook.network/uploads/step/cover/1858737/cedd5c5e0600fd2c.jpg',
      [new Ingerdient('麵條', 1), new Ingerdient('高湯', 1), new Ingerdient('配料', 1)]),
    new Recipe('Test2', 'This Description 2!', 'https://photo.518.com.tw/selfmedia/articles/1822/166184376108829.jpeg',
      [new Ingerdient('麵條', 2), new Ingerdient('高湯', 2), new Ingerdient('配料', 2)]),
    new Recipe('Test3', 'This Description 3!', 'https://media.gq.com.tw/photos/602f8f38797fed84034b1608/4:3/w_4032,h_3024,c_limit/IMG_5275.JPG',
      [new Ingerdient('麵條', 3), new Ingerdient('高湯', 3), new Ingerdient('配料', 3)]),
  ];
  constructor(private slService: ShoppingListService) { }

  getRecipes() {
    // slice 取得副本
    return this.recipes.slice();
  }

  getById(index: number) {
    return this.recipes[index];
  }

  addIngerdientToShoppingList(ingerdient: Ingerdient[]) {
    this.slService.addIngerdientToShoppingList(ingerdient);
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  addRecipe(newRecipe: Recipe){
    this.recipes.push(newRecipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipes(index: number){
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
