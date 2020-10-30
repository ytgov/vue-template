export interface AuthUser {
    id: string;
    displayName: string;
    familyName: string;
    givenName: string;
    username: string;
    email: string;
    email_verified: boolean;
}

export namespace AuthUser {
    export function fromPassport(user: any): AuthUser {
        return {
            id: user.id,
            displayName: user.displayName,
            familyName: user.name.familyName,
            givenName: user.name.givenName,
            username: user._json.preferred_username,
            email: user._json.email,
            email_verified: user._json.email_verified
        };
    }
}
