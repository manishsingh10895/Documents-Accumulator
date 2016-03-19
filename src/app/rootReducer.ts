import * as Actions from './actions';

const initialState = {
    githubToken: window.localStorage.getItem('githubtoken') || false
}

export function rootReducer(state = initialState, action) {
    switch (action) {
        case Actions.GITHUB_AUTH:
            return {
                githubToken: authenticate()
            };
        default:
            return state;
    }
}

function authenticate() {
    //Get token from github oauth
    return "";
}