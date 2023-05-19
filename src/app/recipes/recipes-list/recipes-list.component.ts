import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe-model';
import { RecipesServiceService } from '../recipes-service.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[];
  
  recipeDetail: Recipe;
  constructor(private recipesServiceService: RecipesServiceService) { }

  ngOnInit() {
    this.recipes= this.recipesServiceService.getRecipes();
  }
}
