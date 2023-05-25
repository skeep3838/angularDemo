import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../recipes-service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Ingerdient } from 'src/app/shared/ingerdient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;

  recipeForm: FormGroup;

  constructor(private router: ActivatedRoute,
    private recipeService: RecipesService) { }

  ngOnInit() {
    // 透過Router進來會判斷是新增還是編輯
    // 並對Form做初始化
    this.router.params
      .subscribe((psrsms: Params) => {
        this.id = +psrsms['id'];
        this.editMode = psrsms['id'] != null;
        this.initForm();
      });

  }
  
  get ingredients() { // a getter!
    return this.recipeForm.controls['ingredients'] as FormArray;
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDesc = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getById(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDesc = recipe.description;
      if(recipe.ingerdients){
        for(let ingerient of recipe.ingerdients){
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingerient.name),
              'amount': new FormControl(ingerient.amount)
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImagePath),
      'description': new FormControl(recipeDesc),
      'ingredients': recipeIngredients
    });
  }

  onSubmit(){
    console.log(this.recipeForm);
  }

}
