export const GITHUB_AUTH = 'GITHUB_AUTH';
export const CHANGE_NAME = 'CHANGE_NAME';

export class Actions {
    constructor() {
    }

    github_auth(token:string) {
        //Authenticate user via the store using the token received from github
        return {
            type: GITHUB_AUTH,
            token: token,
            authenticated: true
        };
    };
    
    change_name(name:string) {
        //Authenticate user via the store using the token received from github
        return {
            type: CHANGE_NAME,
            githubname: name
        };
    };
}