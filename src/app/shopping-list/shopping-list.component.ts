import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingerdient } from '../shared/ingerdient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingerdients: Ingerdient[];
  private igChangeSub : Subscription;

  constructor(private shoppingListService: ShoppingListService) { }
  
  ngOnInit() {
    this.ingerdients = this.shoppingListService.getIngerdients();
    this.igChangeSub = this.shoppingListService.ingerdientsChanged
    .subscribe((ingerdients: Ingerdient[])=>{
      this.ingerdients = ingerdients;
    });
  }
 
  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }

  // 這邊提出編輯的需求後，再由ShoppingEditComponent 監聽 shoppingListService.startedEdit
  onEditItem(index: number){
    this.shoppingListService.startedEdit.next(index);
  }
}
 