/*
 * Providers provided by Angular
 */
import * as ngCore from 'angular2/core';
import * as browser from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy, RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {Component, View} from 'angular2/core';

import {Login} from './components/login';
import {Home} from './components/home';

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
})
@View({
    directives: [ROUTER_DIRECTIVES, Login, Home],
    template: `
    <blog-header></blog-header>
    <nav-sidebar (NavStateChanged)="moveBody($event)" [navLinks]=links></nav-sidebar>
    <div class="blog-app" [ngClass]="{shiftLeft:shifted}">
        <router-outlet></router-outlet>
    </div>`
})
@RouteConfig([
    { path: '/', component: Home, name: 'Home' },
    { path: '/login', component: Login, name: 'Login' }
])
export class App {
    //component initialization
    ngOnInit() {
        //check authentication
    }

    checkAuthentication() {
        
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