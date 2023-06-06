 import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input() message: string;
  // 當要手動訂閱某個東西時，通常會想用Subject，但用ComponentFactory可以直接使用事件發射器定直接subject
  @Output() close = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  onClose(){
    this.close.emit();
  }

}
