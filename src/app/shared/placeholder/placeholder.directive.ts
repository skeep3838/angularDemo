import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPlaceholder]'
})
export class PlaceholderDirective {

  // 注入視圖容器，自動訪問這個指針在這指令使用的地方 
  constructor(public viewContainerRef: ViewContainerRef) { }

}
