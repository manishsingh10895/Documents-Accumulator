/**
 * Defines all the actions that the program can execute
 * As for Redux patterns state can only be change by one of these actions
 * 
 * See more information about redux and how to mutate state via actions
 * https://github.com/reactjs/redux
 * 
 * Each action can be used to dispatch a change in the store in the RootReducer function
 * See the rootReducer.ts file
 */
export const GITHUB_AUTH = 'GITHUB_AUTH';
export const CHANGE_NAME = 'CHANGE_NAME';

export class Actions {
    constructor() {
    }

    /**
     * Saves the token received from github into the state object tree
     * 
     * @param {string} token
     * The token to be saved
     * 
     * @return {Object} action
     * The action object
     */
    github_auth(token:string) {
        // Authenticate user via the store using the token received from github
        return {
            type: GITHUB_AUTH,
            token: token,
            authenticated: true
        };
    };
    
    /**
     * Saves the username received from Github API into the state tree
     * 
     * @param {string} name
     * The name to be saved
     * 
     * @return {Object} action
     * The action object
     */
    change_name(name:string) {
        // Change the username
        return {
            type: CHANGE_NAME,
            username: name
        };
    };
}