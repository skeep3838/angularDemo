import { ActivatedRoute, Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe-model';
import { RecipesService } from '../recipes-service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[];
  
  recipeDetail: Recipe;
  constructor(private recipesServiceService: RecipesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipes= this.recipesServiceService.getRecipes();
  }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
