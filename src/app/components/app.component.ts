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
    styleUrls: ['./app.theme.scss'],
    template: `
    <div [class.m2app-dark]="isDarkTheme">
        <main>
            <router-outlet></router-outlet>
        </main>
    </div>
    `
})
export class AppComponent implements OnInit {
    //component initialization
    isDarkTheme: boolean = false;

    ngOnInit() {
        //check authentication
    }
}
