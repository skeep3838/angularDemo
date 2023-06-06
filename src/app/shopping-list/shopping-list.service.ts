import { Subject } from 'rxjs';
import { Ingerdient } from '../shared/ingerdient.model';

export class ShoppingListService {
  // 如果ShoppingList有異動，service要更新ingerdientsChanged，
  // 同時component可以在onInit訂閱此參數，前端資料就會同步更新
  ingerdientsChanged = new Subject<Ingerdient[]>();
  private ingerdients: Ingerdient[] = [
    new Ingerdient('Apple', 5),
    new Ingerdient('Onian', 10)
  ];
  // 編輯模式所使用的資料
  startedEdit = new Subject<number>();

  constructor() { }

  getIngerdients() {
    return this.ingerdients.slice();
  }

  getIngredientByIndex(index: number): Ingerdient{
    return this.ingerdients[index];
  }

  onAddIngerdient(ingerdientInput: Ingerdient){
    this.ingerdients.push(ingerdientInput);
    this.ingerdientsChanged.next(this.ingerdients.slice());
  }

  addIngerdientToShoppingList(ingerdients: Ingerdient[]){
    this.ingerdients.push(...ingerdients);
    this.ingerdientsChanged.next(this.ingerdients.slice());
  }

  updateIngerdient(index: number, newIngerdient: Ingerdient){
    this.ingerdients[index] = newIngerdient;
    this.ingerdientsChanged.next(this.ingerdients.slice());
  }

  deleteIngerdient(index: number){
    this.ingerdients.splice(index, 1);
    this.ingerdientsChanged.next(this.ingerdients.slice());
  }
}
