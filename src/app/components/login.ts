/**
 * Import decorators and services from angular
 */
import {Component, Inject, NgZone, OnDestroy} from 'angular2/core';
import {Router} from 'angular2/router';

/**
 * Include action representations from our list of actions to dispatch
 */
import {Actions} from './../actions';

/**
 * Import the authentication service to be injected into our component
 */
import { Authentication } from './../services/authentication';

@Component({
    selector: 'login',
    providers: [Authentication],
    template: `
    <div>
        <button *ngIf="!authenticated" (click)="authenticate()">Authenticate with Github</button>
    </div>
    `
})
export class Login implements OnDestroy {
    unsubscribe: any;
    authenticated: boolean;

    //Inject Authentication service on construction
    constructor(private _router: Router, private _ngZone: NgZone, @Inject('AppStore') private appStore, @Inject(Authentication) private auth, private actions: Actions) {
        this.auth = auth;
        
        this.checkAuth();

        this.unsubscribe = this.appStore.subscribe(() => {
            let state = this.appStore.getState();
            this.authenticated = state.authenticated;

            //Because the BrowserWindow runs outside angular for some reason we need to call Zone.run()
            this._ngZone.run(() => {
                if (state.username != "") {
                    this._router.navigate(['Home']);
                }
            });
        });
    }

    /**
     * Checks for authentication
     * If existing auth in localstorage just gets the user data immediately
     */
    checkAuth() {
        let storageToken = window.localStorage.getItem('authToken');
        
        if(storageToken){
            this.auth.requestUserData(storageToken);
        }
    }

    authenticate() {
        this.auth.githubHandShake();
    }

    ngOnDestroy() {
        //remove listener
        this.unsubscribe();
    }
}