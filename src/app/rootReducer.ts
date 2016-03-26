import * as Actions from './actions';

const initialState = {
    githubToken: window.localStorage.getItem('githubtoken') || false,
    authenticated: false,
    githubname: ''
}

export function rootReducer(state = initialState, action) {
    switch (action.type) {
        case Actions.GITHUB_AUTH:
            return Object.assign(state, { githubToken: action.token, authenticated: true });
        case Actions.CHANGE_NAME:
            return Object.assign(state, { githubname: action.githubname });
        default:
            return state;
    }
}