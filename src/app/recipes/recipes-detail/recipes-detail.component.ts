import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe-model';
import { Ingerdient } from 'src/app/shared/ingerdient.model';
import { RecipesService } from '../recipes-service';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {

  @Input() recipeDetail: Recipe;
  constructor(private recipesService: RecipesService) { }

  ngOnInit() {
  }

  onAddToShoppingList(ingerdients: Ingerdient[]) {
    this.recipesService.addIngerdientToShoppingList(ingerdients);
  }
}
