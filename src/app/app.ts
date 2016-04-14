/*
 * Providers provided by Angular
 */
import * as ngCore from 'angular2/core';
import * as browser from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy, RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {Component} from 'angular2/core';

/**
 * setup redux
 */
import {createStore} from 'redux';
import {rootReducer} from './rootReducer';
import {Actions} from './actions';
const appStore = createStore(rootReducer);


/**
 * Import our child components
 */
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
    directives: [ROUTER_DIRECTIVES, Login, Home],
    template: `
    <div>
        <router-outlet></router-outlet>
    </div>
    `
})
@RouteConfig([
    { path: '/', component: Login, name: 'Login' },
    { path: '/login', component: Login, name: 'Login' },
    { path: '/home', component: Home, name: 'Home' }
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
    ngCore.provide(LocationStrategy, { useClass: HashLocationStrategy }),
    ngCore.provide('AppStore', { useValue: appStore }),
    Actions
])