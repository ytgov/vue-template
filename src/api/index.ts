import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { userRouter, authRouter} from "./models";
import * as config from './config';
import { doHealthCheck } from "./utils/healthCheck";

const app = express();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(helmet());

// very basic CORS setup
app.use(cors({
  origin: config.FRONTEND_URL,
  optionsSuccessStatus: 200,
  credentials: true
}));

app.get("/api/healthCheck", (req: Request, res: Response) => {
  doHealthCheck(res);
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.listen(config.API_PORT, () => {
  console.log(`Dashboard API listenting on port ${config.API_PORT}`);
});
