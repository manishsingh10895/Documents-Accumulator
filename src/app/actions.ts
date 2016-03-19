export const GITHUB_AUTH = 'GITHUB_AUTH';

export class Actions {
    constructor() {
    }

    github_auth(token) {
        //Authenticate user via the store using the token received from github
        return {
            type: GITHUB_AUTH,
            token: token,
            authenticated: true
        };
    };
}