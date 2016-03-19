import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Inject} from 'angular2/core';

import {Actions} from './../actions';

@Injectable()
export class Authentication {

    //Inject the store to make sure state changes go through the store
    constructor( @Inject('AppStore') private appStore, private actions: Actions, http: Http) {
        //authenticate and call the store to update the token
    }
}