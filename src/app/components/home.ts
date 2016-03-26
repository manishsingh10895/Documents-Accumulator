import {Component,Inject} from 'angular2/core';

@Component({
    selector: 'home',
    template: `
    <div>
       <h1>{{name}}</h1>
       <input [(ngModel)]="name" />
    </div>
    <br/>
    <div>
       <span>{{counter}}</span>
       <button (click)="incrementCounter()">Increment</button>
    </div>
    `
})
export class Home {
    name: string;
    counter: number;

    constructor(@Inject('AppStore') private appStore) {
        let state = this.appStore.getState();
        this.name = state.username;
        this.counter = 0;
    }

    incrementCounter() {
        let newCounter = this.counter + 1;
        this.counter = newCounter;
    }

    ngOnInit() {
        // Our API
    }
}