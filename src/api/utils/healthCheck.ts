import { Response } from "express";
/* import { isCacheConnected } from "./cache";
import { isDatabaseConnected } from "../database" */

export async function doHealthCheck(res: Response) {

    return res.status(200).send("HEALTHY");
}