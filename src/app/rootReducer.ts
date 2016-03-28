import * as Actions from './actions';

const initialState = {
    authToken: window.localStorage.getItem('authToken') || false,
    authenticated: false,
    username: ''
}

export function rootReducer(state = initialState, action) {
    switch (action.type) {
        case Actions.GITHUB_AUTH:
            localStorage.setItem('authToken', action.token);
            return Object.assign(state, { authToken: action.token, authenticated: true });
        case Actions.CHANGE_NAME:
            return Object.assign(state, { username: action.username });
        default:
            return state;
    }
}