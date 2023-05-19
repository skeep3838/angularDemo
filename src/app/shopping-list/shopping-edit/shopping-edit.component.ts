import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingerdient } from 'src/app/shared/ingerdient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput', {static: true}) nameInput: ElementRef;
  @ViewChild('amountInput', {static: true}) amountInput: ElementRef;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  addItem(){
    const ingNaame = this.nameInput.nativeElement.value;
    const ingAmount = this.amountInput.nativeElement.value;
    this.shoppingListService.onAddIngerdient(new Ingerdient(ingNaame, ingAmount));
  }
}
