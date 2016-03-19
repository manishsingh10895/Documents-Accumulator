import {Component, Inject, View} from 'angular2/core';

//we get authentication service to provide us with authentication methods
import { Authentication } from './../services/authentication';

@Component({
    selector: 'login'
})
@View({
    template: `
    <div>
        Login
    </div>
    `
})
export class Login {
    //Inject Authentication service on construction
    constructor(auth: Authentication) {

    }
}