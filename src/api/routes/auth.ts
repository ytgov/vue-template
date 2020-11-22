import { Express, NextFunction, Request, Response } from "express"
import * as ExpressSession from "express-session";
import { AuthUser } from "../models/auth";
import { AUTH_REDIRECT, VIVVO_CONFIG } from "../config";

// Old
// var OidcStrategy = require('passport-openidconnect').Strategy
var OidcStrategy = require('openid-client').Strategy;

const { Issuer } = require('openid-client');

var yukonIssuer = new Issuer({
    issuer: VIVVO_CONFIG.issuer,
    authorization_endpoint: VIVVO_CONFIG.authorizationURL,
    token_endpoint: VIVVO_CONFIG.tokenURL,
    userinfo_endpoint: VIVVO_CONFIG.userInfoURL,
    jwks_uri: 'https://yukon.vivvocloud.com/.well-known/jwks.json',
});

const yukonClient = new yukonIssuer.Client({
  client_id: VIVVO_CONFIG.clientID,
  client_secret: VIVVO_CONFIG.clientSecret,
  redirect_uris: [VIVVO_CONFIG.callbackURL],
  response_types: ['code'],
});

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
        resave: false,
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

    passport.use('oidc', new OidcStrategy({
          client: yukonClient,
          // Currently an issue where CitizenOne token endpoint returns a 
          // token with a token_type of "bearer" (lower case), but then requires
          // the Athorization header to be "Bearer" (upper case).
        },
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
        passport.authenticate('oidc', { 
          failureRedirect: '/api/error',
          // Capture failure message in req.session.messages for debugging.
          failureMessage: true
         }),
        (req, res) => {
            res.redirect(AUTH_REDIRECT);
        }
    );

    app.use("/api/error", (req: Request, res: Response) => {
        if (req.session) {
          console.log(req.session.messages);
        }
        
        res.status(500).send("Authentication error");
    })
}
