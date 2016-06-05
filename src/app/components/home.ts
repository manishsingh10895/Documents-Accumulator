/**
 * Import decorators and services from angular
 */
import {Component, Inject, OnInit} from '@angular/core';

@Component({
  selector: 'ae-home',
  template: `
    <div>
       <h1>{{name}}</h1>
       <input [(ngModel)]='name' />
    </div>
    `
})
export class HomeComponent implements OnInit {
  name: string;

  constructor( @Inject('AppStore') private appStore) {
    let state = this.appStore.getState();
    this.name = state.username;
  }

  ngOnInit() {
    // Our API
  }
}
