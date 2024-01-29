import * as express from 'express';
import { Registration } from '../data/models/registration';

// adds users to the database
export const addUser = (req: express.Request, res: express.Response) => {
    const user: Registration = new Registration(req);
    user.checkIfEmailExists(res);
}

// gets all users that are stored in the database
export const getAllUsers = (req: express.Request, res: express.Response) => {
    const allUsers: Registration = new Registration(req);
    allUsers.getAllUsers(res);
}