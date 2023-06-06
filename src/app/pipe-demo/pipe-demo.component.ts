import { Component, OnInit } from '@angular/core';
import { Serve } from './serve';


@Component({
  selector: 'app-pipe-demo',
  templateUrl: './pipe-demo.component.html'
})
export class PipeDemoComponent implements OnInit {

  serves: Serve[] = [
    new Serve('stable', 'Production Server', 'medium',  new Date()),
    new Serve('stable', 'User DataBase', 'large', new Date()),
    new Serve('offline','Deveiopment Server', 'small', new Date()),
    new Serve('critical','Test Server', 'small',  new Date())
  ];
  constructor() { }

  ngOnInit() {
  }

  filterdStatus = '';
  getStatusClasses(serve: Serve) {
    console.log(serve);
    return {
      'list-group-item-success': serve.status === 'stable',
      'list-group-item-wearning': serve.status === 'offline',
      'list-group-item-danger': serve.status === 'critical'
    }
  }

}
