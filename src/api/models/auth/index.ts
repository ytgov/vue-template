export interface AuthUser {
    display_name: string;
    last_name: string;
    first_name: string;
    email: string;
    email_verified: boolean;
    status: string;
    roles: string[];
}

export namespace AuthUser {
    export function fromOpenId(user: any): AuthUser {
        return {
            display_name: user.name,
            last_name: user.family_name,
            first_name: user.given_name,
            email: user.email,
            email_verified: user.email_verified,
            status: STATUS_INACTIVE,
            roles: []
        };
    }

    export const STATUS_ACTIVE = "Active";
    export const STATUS_INACTIVE = "Inactive";
}