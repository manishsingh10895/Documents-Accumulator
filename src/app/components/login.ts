import {Component, Inject, NgZone} from 'angular2/core';
import {OnDestroy} from 'angular2/core'

//we get authentication service to provide us with authentication methods
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
    auth: Authentication;
    unsubscribe: any;
    authenticated: boolean;

    //Inject Authentication service on construction
    constructor(private _ngZone: NgZone, @Inject('AppStore') private appStore, @Inject(Authentication) auth) {
        this.auth = auth;

        this.unsubscribe = this.appStore.subscribe(() => {
            let state = this.appStore.getState();
            this.authenticated = state.authenticated;
            //Because the BrowserWindow runs outside angular for some reason we need to call Zone.run()
            this._ngZone.run(() => {console.log('Outside Done!') });
        });
    }

    authenticate() {
        this.auth.githubHandShake();
    }

    ngOnDestroy() {
        //remove listener
        this.unsubscribe();
    }
}