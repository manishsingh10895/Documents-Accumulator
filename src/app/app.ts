/*
 * Providers provided by Angular
 */
import {provide, enableProdMode, OnInit} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

// ROUTER
import {ROUTER_PROVIDERS, RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

// HTTP
import {HTTP_PROVIDERS} from '@angular/http';

// Decorators
import {Component} from '@angular/core';

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
import {LoginComponent} from './components/login';
import {HomeComponent} from './components/home';


/*
 * App Component
 * Top Level Component
 */
@Component({
    // The selector is what angular internally uses
    selector: 'ae-app', // <app></app>
    directives: [ROUTER_DIRECTIVES, LoginComponent, HomeComponent],
    template: `
    <div>
        <router-outlet></router-outlet>
    </div>
    `
})
@RouteConfig([
    { path: '/', component: LoginComponent, name: 'Login' },
    { path: '/login', component: LoginComponent, name: 'Login' },
    { path: '/home', component: HomeComponent, name: 'Home' }
])
export class AppComponent implements OnInit {
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
bootstrap(AppComponent, [
    ...HTTP_PROVIDERS,
    ...ROUTER_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
    provide('AppStore', { useValue: appStore }),
    Actions
]).catch(err => console.error(err));
