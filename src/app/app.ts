/*
 * Angular Modules
 */
import { enableProdMode, NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Setup redux with ngrx
import { Store, StoreModule } from '@ngrx/store';

/**
 * Import our child components
 */
import { AppComponent } from './components/app.component';
import { FilesComponent } from './components/files/files.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { FileComponent } from './components/file/file.component';
import { SidebarComponent } from './components/sidebar/sidebar.component'; 
/**
 * Import material UI Components
 */
import { MaterialModule } from '@angular/material';

import { routes } from './app.routes';

// Pipes
import { FilterPipe } from './pipes/filter-files.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { IconPipe } from './pipes/icon.pipe';
import { FileTypePipe } from './pipes/fileType.pipe';
/**
 * Import the authentication service to be injected into our component
 */
import { FileManager } from './services/fileManager';
import { Utility } from './services/utility';
/*
 * provide('AppStore', { useValue: appStore }),
 */
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        MaterialModule.forRoot(),
        RouterModule.forRoot(routes, { useHash: true }),
    ],
    providers: [FileManager, FilterPipe, Utility],
    declarations: [
        AppComponent, FilesComponent, 
        FilterPipe, SortPipe, IconPipe,
        FileTypePipe, HeaderComponent,
        FileComponent, SidebarComponent,
        MenuComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);
