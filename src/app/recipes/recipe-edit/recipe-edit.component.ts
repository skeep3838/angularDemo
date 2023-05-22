import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;

  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.params
      .subscribe((psrsms: Params) => {
        this.id = +psrsms['id'];
        this.editMode = psrsms['id'] != null;
        console.log(this.editMode);
      });
  }

}
