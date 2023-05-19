import { Component, OnInit } from '@angular/core';
import { Ingerdient } from '../shared/ingerdient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingerdients: Ingerdient[] = [
    new Ingerdient('Apple', 5),
    new Ingerdient('Onian', 10)
  ];
  constructor() { }

  ngOnInit() {
  }

  onUpdateIngerdient(ingerdientInput: Ingerdient){
    this.ingerdients.push(ingerdientInput);
  }
}
