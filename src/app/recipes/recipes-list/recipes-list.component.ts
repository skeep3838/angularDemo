import { ActivatedRoute, Router } from '@angular/router';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { Recipe } from '../recipe-model';
import { RecipesService } from '../recipes-service';
import * as fromApp from '../../store/app.reducer'

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
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('recipe')
    .pipe(map(recipeStatus => recipeStatus.recipes))
    .subscribe((recipes: Recipe[]) => {
      this.recipes = recipes
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // Router         - router 用于管理应用程序中的路由对象，例如重新導航
  // ActivatedRoute - route  用于跟踪已经激活的路由对象
  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
