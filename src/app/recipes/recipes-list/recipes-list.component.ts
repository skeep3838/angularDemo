import { ActivatedRoute, Router } from '@angular/router';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe-model';
import { RecipesService } from '../recipes-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html'
})
export class RecipesListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipeDetail: Recipe;
  subscription: Subscription;  // 用來訂閱即時食譜資料

  constructor(private recipesService: RecipesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.recipesService.recipeChanged.subscribe((newRecipes) =>{
      this.recipes=newRecipes;
    });
    this.recipes= this.recipesService.getRecipes();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // Router         - router 用于管理应用程序中的路由对象，例如重新導航
  // ActivatedRoute - route  用于跟踪已经激活的路由对象
  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
