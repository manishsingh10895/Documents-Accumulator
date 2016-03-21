import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Inject} from 'angular2/core';

import {Actions} from './../actions';
// Or in the renderer process.
const remote = require('electron').remote;
const BrowserWindow = remote.BrowserWindow;

const options = require('./../config.json');

@Injectable()
export class Authentication {
    authWindow: any;
    http: Http;

    //Inject the store to make sure state changes go through the store
    constructor( @Inject('AppStore') private appStore, private actions: Actions, http: Http) {
        //authenticate and call the store to update the token
        this.authWindow = new BrowserWindow({ width: 800, height: 600, show: false});
        this.http = http;
    }

    githubHandShake() {
        
        // Build the OAuth consent page URL
        var githubUrl = 'https://github.com/login/oauth/authorize?';
        var authUrl = githubUrl + 'client_id=' + options.client_id + '&scope=' + options.scopes;
        this.authWindow.loadUrl(authUrl);
        this.authWindow.show();

        // Handle the response from GitHub - See Update from 4/12/2015

        this.authWindow.webContents.on('will-navigate', (event, url) => {
            this.handleGitHubCallback(url);
        });

        this.authWindow.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl) => {
            this.handleGitHubCallback(newUrl);
        });

        // Reset the authWindow on close
        this.authWindow.on('close', function() {
            this.authWindow = null;
        }, false);
    }

    handleGitHubCallback(url) {
        var raw_code = /code=([^&]*)/.exec(url) || null;
        var code = (raw_code && raw_code.length > 1) ? raw_code[1] : null;
        var error = /\?error=(.+)$/.exec(url);

        if (code || error) {
            // Close the browser if code found or error
            this.authWindow.destroy();
        }

        // If there is a code, proceed to get token from github
        if (code) {
            this.requestGithubToken(options, code);
        } else if (error) {
            alert('Oops! Something went wrong and we couldn\'t' +
                'log you in using Github. Please try again.');
        }
    }

    requestGithubToken(options, code) {

        var creds = "client_id=" + options.client_id + "&client_secret=" + options.client_secret + "&code=" + code;

        this.http.post('https://github.com/login/oauth/access_token', creds)
        .map(res => res.json())
        .subscribe(
            data => console.log(data),
            err => console.log(err),
            () => console.log('Authentication Complete')
        );

    }

}