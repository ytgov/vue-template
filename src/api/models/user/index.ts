import { AuthUser } from "../auth";

export interface AppUser extends AuthUser {
    teams?: Array<Team>;
}

export interface Team {
    id: string;
    name: string;
    role: string;
}