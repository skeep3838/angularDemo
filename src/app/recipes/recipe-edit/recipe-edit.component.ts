import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../recipes-service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Ingerdient } from 'src/app/shared/ingerdient.model';
import { Recipe } from '../recipe-model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;

  recipeForm: FormGroup;

  constructor(private avtiveRoute: ActivatedRoute,
    private recipeService: RecipesService,
    private router: Router) { }

  ngOnInit() {
    // 透過Router進來會判斷是新增還是編輯
    // 並對Form做初始化
    // 追蹤使用中的路由物件，來取得id 
    this.avtiveRoute.params
      .subscribe((psrsms: Params) => {
        this.id = +psrsms['id'];
        this.editMode = psrsms['id'] != null;
        this.initForm();
      });

  }

  get ingerdients() { // a getter!
    return this.recipeForm.controls['ingerdients'] as FormArray;
  }

  // 初始化Reactive Form表單
  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDesc = '';
    let recipeIngredients = new FormArray([]);

    // 如果是編輯模式，放入要編輯的食譜資訊
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
      'ingerdients': recipeIngredients
    });
    console.log(this.recipeForm);
  }

  // 動態新增Ingredients
  onAddIngredient() {
    // < > 內寫的是要轉換的類型
    (<FormArray>this.recipeForm.controls['ingerdients']).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onSubmit() {
    let newRecipe: Recipe = this.recipeForm.value;
    console.log(newRecipe)
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }
    // 更新完成後清空編輯食譜資訊
    this.onCancel();
  }

  onCancel() {
    // 取消之後回到當前食譜的編輯畫面
    this.router.navigate(['../'], { 'relativeTo': this.avtiveRoute });
  }

  onDeleteIngredient(index: number) {
    this.ingerdients.removeAt(index);
  }

}
