import { Component, OnInit } from '@angular/core';
import { Ingerdient } from 'src/app/shared/ingerdient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  addItem(form: NgForm){
    const value = form.value;
    this.shoppingListService.onAddIngerdient(new Ingerdient(value.name, value.amount));
  }
}
