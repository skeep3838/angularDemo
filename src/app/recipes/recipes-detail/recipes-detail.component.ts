import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Recipe } from '../recipe-model';
import { Ingerdient } from 'src/app/shared/ingerdient.model';
import { RecipesService } from '../recipes-service';
import * as ShoppingListAction from "../../shopping-list/store/shopping-list.action";

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html'
})
export class RecipesDetailComponent implements OnInit {
  recipeDetail: Recipe;
  id: number;

  constructor(private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<{ shoppingList: { ingerdients: Ingerdient[] } }>) { }

  ngOnInit() {
    // const id = this.router.snapshot.params['ip'];
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id']; //+ 號為自動轉型成number
      this.recipeDetail = this.recipesService.getById(this.id);
    });
  }

  onAddToShoppingList(ingerdients: Ingerdient[]) {
    // this.recipesService.addIngerdientToShoppingList(ingerdients);
    this.store.dispatch(new ShoppingListAction.AddIngredients(ingerdients))
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // 等同於
    // this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }


  onDeleteRecipe(){
    this.recipesService.deleteRecipes(this.id);
    this.router.navigate(['/recipe']);
  }
}
