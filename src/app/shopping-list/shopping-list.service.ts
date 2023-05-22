import { EventEmitter, Injectable } from '@angular/core';
import { Ingerdient } from '../shared/ingerdient.model';

@Injectable()
export class ShoppingListService {
  ingerdientsChanged = new EventEmitter<Ingerdient[]>();
  private ingerdients: Ingerdient[] = [
    new Ingerdient('Apple', 5),
    new Ingerdient('Onian', 10)
  ];
  constructor() { }

  getIngerdients() {
    return this.ingerdients.slice();
  }

  onAddIngerdient(ingerdientInput: Ingerdient){
    this.ingerdients.push(ingerdientInput);
    this.ingerdientsChanged.emit(this.ingerdients.slice());
  }

  addIngerdientToShoppingList(ingerdients: Ingerdient[]){
    this.ingerdients.push(...ingerdients);
    this.ingerdientsChanged.emit(this.ingerdients.slice());
  }
}
