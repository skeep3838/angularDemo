import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import * as fromApp from './store/app.reducer'
import * as AuthAction from './auth/store/auth.action'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Demo';

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(new AuthAction.AutoLogin());
  }
}
