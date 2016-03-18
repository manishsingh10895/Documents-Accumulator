/*
 * Providers provided by Angular
 */
import * as ngCore from 'angular2/core';
import * as browser from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {Component} from 'angular2/core';
/*
 * App Environment Providers
 * providers that only live in certain environment
 */
const ENV_PROVIDERS = [];

ENV_PROVIDERS.push(browser.ELEMENT_PROBE_PROVIDERS);

/*
 * App Component
 * Top Level Component
 */
@Component({
    // The selector is what angular internally uses
    selector: 'app', // <app></app>
    // The template for our app
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
export class App {
    name:string;
    counter: number;
    
    constructor(){
        this.name = "Angular2 Minimal";
        this.counter = 0;
    }
    
    incrementCounter(){
        let newCounter = this.counter + 1;
        this.counter = newCounter;
    }
    
    ngOnInit() {
        // Our API
    }
}

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
browser.bootstrap(App, [
        ...ENV_PROVIDERS,
        ...HTTP_PROVIDERS,
        ...ROUTER_PROVIDERS,
        ngCore.provide(LocationStrategy, { useClass: HashLocationStrategy })
    ])