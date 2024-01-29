import * as express from 'express';
import { userverify } from "../data/models/session-verify"

export const verifyuser = async (req: express.Request, res: express.Response) => {
new userverify(req).verification(req, res);
}