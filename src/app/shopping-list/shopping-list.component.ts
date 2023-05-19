import { Component, OnInit } from '@angular/core';
import { Ingerdient } from '../shared/ingerdient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingerdients: Ingerdient[];
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingerdients = this.shoppingListService.getIngerdients();
    this.shoppingListService.ingerdientsChanged.subscribe((ingerdient:Ingerdient)=>{
      this.ingerdients = this.shoppingListService.getIngerdients();
    });
  }
 
}
 