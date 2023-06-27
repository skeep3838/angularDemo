import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe-model';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent implements OnInit {
  // 由recipeList引進的參數資訊
  @Input() recipeForItem: Recipe; 
  @Input() index: number;

  ngOnInit() {
  }

}
