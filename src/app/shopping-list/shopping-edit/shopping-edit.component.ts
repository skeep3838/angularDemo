import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingerdient } from 'src/app/shared/ingerdient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput', {static: true}) nameInput: ElementRef;
  @ViewChild('amountInput', {static: true}) amountInput: ElementRef;
  @Output() ingerdientAdded = new EventEmitter<Ingerdient>();
  constructor() { }

  ngOnInit() {
  }

  addItem(){
    const ingNaame = this.nameInput.nativeElement.value;
    const ingAmount = this.amountInput.nativeElement.value;
    this.ingerdientAdded.emit(new Ingerdient(ingNaame, ingAmount));
  }
}
