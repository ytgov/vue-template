import { Express, NextFunction, Request, Response } from "express"
import * as ExpressSession from "express-session";
import { AuthUser } from "../models/auth";
import { AUTH_REDIRECT, VIVVO_CONFIG } from "../config";

var OidcStrategy = require('passport-openidconnect').Strategy
var passport = require('passport')

export function ensureLoggedIn(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/api/auth/login');
}

export function configureAuthentication(app: Express) {
    app.use(ExpressSession.default({
        secret: 'supersecret',
        resave: true,
        saveUninitialized: true
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user: any, next: any) => {
        var authUser = AuthUser.fromPassport(user);
        next(null, authUser)
    });

    passport.deserializeUser((obj: any, next: any) => {
        next(null, obj)
    });

    passport.use('oidc', new OidcStrategy(VIVVO_CONFIG,
        (issuer: any, sub: any, profile: any, accessToken: any, refreshToken: any, done: any) => {
            return done(null, profile)
        }));

    app.use('/api/auth/login', passport.authenticate('oidc'));

    app.get('/api/auth/logout', (req: any, res) => {
        req.logout();
        req.session.destroy();
        res.status(202).send();
    });

    /* app.use('/profile', ensureLoggedIn, (req, res) => {
        res.send(req.user);
    }); */

    app.use("/api/auth/isAuthenticated", (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            return res.send(req.user);
        }

        return res.status(401).send();
    });

    app.use('/authorization-code/callback',
        passport.authenticate('oidc', { failureRedirect: '/api/error' }),
        (req, res) => {
            res.redirect(AUTH_REDIRECT);
        }
    );

    app.use("/api/error", (req: Request, res: Response) => {
        console.log(req)
        res.status(500).send("Authentication error");
    })
}
