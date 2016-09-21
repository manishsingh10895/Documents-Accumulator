/**
 * Import decorators and services from angular
 */
import { Component, OnInit } from '@angular/core';

/*
 * App Component
 * Top Level Component
 */
@Component({
    // The selector is what angular internally uses
    selector: 'ae-app', // <app></app>
    template: `
    <div>
        <router-outlet></router-outlet>
    </div>
    `
})
export class AppComponent implements OnInit {
    //component initialization
    ngOnInit() {
        //check authentication
    }

    checkAuthentication() {}
}
