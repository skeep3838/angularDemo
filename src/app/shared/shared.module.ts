import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AlertComponent } from './alert/alert.component';
import { DropdownDirective } from './dropdown.directive';
import { PipeDemoComponent } from '../pipe-demo/pipe-demo.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { ShortPipe } from './shortPipe';
import { FilterPipe } from './filter.pipe';

// 共享模組，其他模組不需要導入就可以使用這些功能
@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    AlertComponent,
    DropdownDirective,
    PipeDemoComponent,
    ShortPipe,
    FilterPipe,
    PlaceholderDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    LoadingSpinnerComponent,
    AlertComponent,
    DropdownDirective,
    PipeDemoComponent,
    ShortPipe,
    FilterPipe,
    PlaceholderDirective
  ],
  // 允許Angular以編程的方式串間組建時，能知道該組建
  entryComponents: [
    AlertComponent
  ]
})
export class SharedModule { }
