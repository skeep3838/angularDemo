import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe-model';
import { Ingerdient } from 'src/app/shared/ingerdient.model';
import { RecipesService } from '../recipes-service';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
  recipeDetail: Recipe;
  id: number;

  constructor(private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    // const id = this.router.snapshot.params['ip'];
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id']; //+ 好為自動轉型成number
      this.recipeDetail = this.recipesService.getById(this.id);
    });
  }

  onAddToShoppingList(ingerdients: Ingerdient[]) {
    this.recipesService.addIngerdientToShoppingList(ingerdients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }


  onDeleteRecipe(){
    this.recipesService.deleteRecipes(this.id);
    this.router.navigate(['/recipe']);
  }
}
