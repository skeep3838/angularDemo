import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../recipes-service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
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
      if (recipe.ingerdients) {
        for (let ingerient of recipe.ingerdients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingerient.name, Validators.required),
              'amount': new FormControl(ingerient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDesc, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  // 動態新增Ingredients
  onAddIngredient() {
    // < > 內寫的是要轉換的類型
    (<FormArray>this.recipeForm.controls['ingredients']).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onSubmit() {
    console.log(this.recipeForm);
    this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    this.recipeService.getById(this.id);
  }

}
