/**
 * Import Actions definitions
 */
import * as Actions from './actions';

/**
 * Define an initial state for our app
 */
const initialState = {
    authToken: window.localStorage.getItem('authToken') || false,
    authenticated: false,
    username: ''
}

/**
 * Our main reducer function
 * 
 * will receive requests to update state with an action type and its parameters
 * Changes the state always in an immutable way.
 * 
 * @param {state} 
 * The current state
 * 
 * @param {action} 
 * The action to be performed
 * 
 * @return state
 * Returns a new instance of the state tree with the action performed on top of it
 */
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