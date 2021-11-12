import express, { Request, Response } from "express";
import { EnsureAuthenticated } from "./auth"
import { AppUser, Team } from "../models/user";

export const userRouter = express.Router();

userRouter.get("/", EnsureAuthenticated, async (req: Request, res: Response) => {
    var appUser: AppUser;
    appUser = req.user;

    // teams could be pulled from the database
    appUser.teams = new Array<Team>();
    appUser.teams[0] = { id: "1234", name: "Team one", role: "Member" }
    appUser.teams[1] = { id: "1234", name: "Team two", role: "Admin" }

    res.send(appUser);
});
