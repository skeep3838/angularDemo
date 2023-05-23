import { Subject } from 'rxjs';
import { Ingerdient } from '../shared/ingerdient.model';

export class ShoppingListService {
  ingerdientsChanged = new Subject<Ingerdient[]>();
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
    this.ingerdientsChanged.next(this.ingerdients.slice());
  }

  addIngerdientToShoppingList(ingerdients: Ingerdient[]){
    this.ingerdients.push(...ingerdients);
    this.ingerdientsChanged.next(this.ingerdients.slice());
  }
}
