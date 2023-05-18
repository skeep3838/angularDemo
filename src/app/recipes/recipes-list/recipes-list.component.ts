import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe-model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  @Output() recipeWasSelect = new EventEmitter<Recipe>();
  
  recipes: Recipe[] = [
    new Recipe('Test1', 'This Description 1!', 'https://tokyo-kitchen.icook.network/uploads/step/cover/1858737/cedd5c5e0600fd2c.jpg'),
    new Recipe('Test2', 'This Description 2!', 'https://photo.518.com.tw/selfmedia/articles/1822/166184376108829.jpeg'),
    new Recipe('Test3', 'This Description 3!', 'https://media.gq.com.tw/photos/602f8f38797fed84034b1608/4:3/w_4032,h_3024,c_limit/IMG_5275.JPG')
  ];
  recipeDetail: Recipe;
  constructor() { }

  ngOnInit() {
  }

  onSelectRecipe(recipeEl: Recipe) {
    this.recipeWasSelect.emit(recipeEl);
  }

}
