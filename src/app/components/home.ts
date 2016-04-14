/**
 * Import decorators and services from angular
 */
import {Component,Inject} from 'angular2/core';

@Component({
    selector: 'home',
    template: `
    <div>
       <h1>{{name}}</h1>
       <input [(ngModel)]="name" />
    </div>
    `
})
export class Home {
    name: string;
    
    constructor(@Inject('AppStore') private appStore) {
        let state = this.appStore.getState();
        this.name = state.username;
    }

    ngOnInit() {
        // Our API
    }
}