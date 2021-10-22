namespace Express {
    export interface Request {
        user?: any;
        //isAuthenticated?: boolean;
        sessionId?: string;
        oidc?: any;

        isAuthenticated(): boolean;
    }
}