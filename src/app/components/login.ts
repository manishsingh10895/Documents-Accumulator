import {Component, Inject} from 'angular2/core';

//we get authentication service to provide us with authentication methods
import { Authentication } from './../services/authentication';

@Component({
    selector: 'login',
    providers: [Authentication],
    template: `
    <div>
        <button (click)="authenticate()">Authenticate with Github</button>
    </div>
    `
})
export class Login {
    auth: Authentication;
    //Inject Authentication service on construction
    constructor( @Inject(Authentication) auth) {
        this.auth = auth;
    }

    authenticate() {
        this.auth.githubHandShake();
    }
}