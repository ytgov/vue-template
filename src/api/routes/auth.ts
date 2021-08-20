import { Express, NextFunction, Request, Response } from "express"
import * as ExpressSession from "express-session";
import { AuthUser } from "../models/auth";
import { AUTH_REDIRECT, VIVVO_CONFIG } from "../config";
import { AUTH_CONFIG } from "../config"

var OidcStrategy = require('passport-openidconnect').Strategy
var passport = require('passport')

const {auth} = require('express-openid-connect')

export function ensureLoggedIn(req: Request, res: Response, next: NextFunction) {
    if (req.oidc.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}

export function configureAuthentication(app: Express) {
    app.user(auth(AUTH_CONFIG))

    // passport.use('oidc', new OidcStrategy(VIVVO_CONFIG,
    //     (issuer: any, sub: any, profile: any, accessToken: any, refreshToken: any, done: any) => {
    //         return done(null, profile)
    //     }));


    // app.get('/api/auth/logout', (req: any, res) => {
    //     req.logout();
    //     req.session.destroy();
    //     res.status(202).send();
    // });

    /* app.use('/profile', ensureLoggedIn, (req, res) => {
        res.send(req.user);
    }); */

    app.use("/api/auth/isAuthenticated", (req: Request, res: Response) => {
        if (req.oidc.isAuthenticated()) {
            return res.send(JSON.stringify(req.oidc.user));
        }

        return res.status(401).send();
    });

    // app.use('/authorization-code/callback',
    //     passport.authenticate('oidc', { failureRedirect: '/api/error' }),
    //     (req, res) => {
    //         res.redirect(AUTH_REDIRECT);
    //     }
    // );

    app.use("/api/error", (req: Request, res: Response) => {
        console.log(req)
        res.status(500).send("Authentication error");
    })
}
