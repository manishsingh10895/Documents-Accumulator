import {Component, View} from 'angular2/core';

@Component({
    selector: 'home'
})
@View({
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

    constructor() {
        this.name = "Angular2 Minimal";
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