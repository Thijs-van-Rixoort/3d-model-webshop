import * as express from 'express';
import { user } from "../data/models/cooltestingmarcus"



//The server talks to this controller
//This controller executes a model


export const getusers = (req: express.Request, res: express.Response) => {
    new user().showUsers(req, res);
}