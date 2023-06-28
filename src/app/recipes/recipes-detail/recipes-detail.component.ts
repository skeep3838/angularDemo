import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

import { Recipe } from '../recipe-model';
import { Ingerdient } from 'src/app/shared/ingerdient.model';
import { RecipesService } from '../recipes-service';
import * as ShoppingListAction from "../../shopping-list/store/shopping-list.action";
import * as fromApp from '../../store/app.reducer'
import * as RecipeActions from '../store/recipe.action'

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
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.route.params.pipe(
      map(params => {
        return +params['id'];
      }),
      switchMap(id => {
        this.id = id;
        return this.store.select('recipe');
      }),
      map(recipeState => {
        return recipeState.recipes.find((recipe, index) => {
          return index === this.id;
        });
      })).subscribe(recipe => {
        this.recipeDetail = recipe;
      });
  }

  onAddToShoppingList(ingerdients: Ingerdient[]) {
    this.store.dispatch(new ShoppingListAction.AddIngredients(ingerdients))
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }


  onDeleteRecipe() {
    this.store.dispatch(new RecipeActions.deleteRecipe(this.id));
    this.router.navigate(['/recipe']);
  }
}
