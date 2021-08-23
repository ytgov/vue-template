import { Express, NextFunction, Request, Response } from "express"
import * as ExpressSession from "express-session";
import { AuthUser } from "../models/auth";
import { AUTH_REDIRECT, VIVVO_CONFIG } from "../config";
import { FRONTEND_URL } from "../config";

const {auth} = require('express-openid-connect')

export function ensureLoggedIn(req: Request, res: Response, next: NextFunction) {
    if (req.oidc.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}

export function configureAuthentication(app: Express) {

    app.use(ExpressSession.default({
        secret: 'supersecret',
        resave: true,
        saveUninitialized: true
    }));

    app.use(auth({
        authRequired: false,
        auth0Logout: false, // This is false so that you don't get completely logged out of azure (other yg apps) on logout
        routes: {
            login: "/api/auth/login", // Overides default express-openid-connect routes
            //logout: "/api/auth/logout",
            postLogoutRedirect: FRONTEND_URL
        }
    }));

    app.use("/", async (req: Request, res: Response, next: NextFunction) => {
        if (req.oidc.isAuthenticated()) {
            req.user = AuthUser.fromOpenId(req.oidc.user);
        }

        next();
    });

    app.get("/", async (req: Request, res: Response) => {
        if (req.oidc.isAuthenticated()) {
            let user = AuthUser.fromOpenId(req.oidc.user) as AuthUser;
            req.user = user;

            res.redirect(AUTH_REDIRECT);
        }
        else {
            // this is hard-coded to accomodate strage behaving in sendFile not allowing `../` in the path.
            // this won't hit in development because web access is served by the Vue CLI - only an issue in Docker
            res.sendFile("/home/node/app/dist/web/index.html")
        }
    });

    app.get("/api/auth/isAuthenticated", async (req: Request, res: Response) => {
        if (req.oidc.isAuthenticated()) {
            let person = req.user;
            //let me = await db.getByEmail(person.email);
            return res.json({ data: person });
        }
        return res.status(401).send();
    });

    app.get('/api/auth/logout', async (req: any, res) => {
        req.session.destroy();
        res.status(401)
        await (res as any).oidc.logout();
    });

    
    app.use("/api/error", (req: Request, res: Response) => {
        console.log(req)
        res.status(500).send("Authentication error");
    })
}


export function EnsureAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (req.oidc.isAuthenticated()) {
        return next();
    }

    res.status(401).send("Not authenticated"); //;.redirect('/api/auth/login');
}