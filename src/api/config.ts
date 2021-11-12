import * as dotenv from "dotenv";

let path;
switch (process.env.NODE_ENV) {
  case "test":
    path = `.env.test`;
    break;
  case "production":
    path = `.env.production`;
    break;
  default:
    path = `.env.development`;
}
dotenv.config({ path: path });

export const API_PORT = parseInt(process.env.API_PORT || "3000");
export const FRONTEND_URL = process.env.FRONTEND_URL || "";
export const AUTH_REDIRECT = process.env.AUTH_REDIRECT || process.env.FRONTEND_URL || "";
export const NODE_ENV = process.env.NODE_ENV;

export const CLIENT_ID = process.env.CLIENT_ID
export const CLIENT_SECRET = process.env.CLIENT_SECRET
export const ISSUER_BASE_URL = process.env.ISSUER_BASE_URL
export const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN
export const SECRET = process.env.SECRET