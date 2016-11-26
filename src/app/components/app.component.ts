/**
 * Import decorators and services from angular
 */
import { Component, OnInit } from '@angular/core';
const { ipcRenderer } = require('electron');
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
        document.body.addEventListener('click', e => {
            let button = e.which || e.button;
            if(button == 1) {
                document.getElementById('context-menu').classList.remove('active');
            }
        });

        document.addEventListener('keydown', e => {
            if(e.keyCode == 27)  document.getElementById('context-menu').classList.remove('active');
        });
    }
}
