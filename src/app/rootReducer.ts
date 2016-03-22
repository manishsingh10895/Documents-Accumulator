import * as Actions from './actions';

const initialState = {
    githubToken: window.localStorage.getItem('githubtoken') || false,
    authenticated: false
}

export function rootReducer(state = initialState, action) {
    switch (action.type) {
        case Actions.GITHUB_AUTH:
            return Object.assign(state, { githubToken: action.token, authenticated: true });
        default:
            return state;
    }
}

function authenticate() {
    //Get token from github oauth
    return "";
}