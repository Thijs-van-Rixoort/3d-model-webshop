import * as express from 'express';
import { pool } from '../../Util/database';
import { FieldPacket, RowDataPacket } from 'mysql2';
export class Registration {
    /* ----------Properties--------- */
    private email: string;
    private password: string;

    /* ------------Constructor------ */
    public constructor(request: express.Request) {
        this.email = request.body.email;
        this.password = request.body.password;
    }
    /* ---------Methods--------- */
    /**
     * sends query to the database
     * @author Ömer Aynaci
     * @param {express.Response} response
     */
    public addUser(response: express.Response): void {
        pool.query(`INSERT INTO user (email, password) VALUES (?,?)`, [this.email, this.password],
            function (err, results: RowDataPacket[]) {
                if (err) {
                    response.status(404).json({ Message: "Email Already Exists" });
                } else {
                    response.status(200).json({ Message: "Email Added to the Database" });
                }
            })
    }
    /**
     * checks if email exists in database
     * if email exists then do nothing
     * if email doesn't exists then store the email in the database
     * @author Ömer Aynaci
     * @param {express.Response} response 
     */
    public checkIfEmailExists(response: express.Response): void {
        pool.query(`SELECT * FROM user WHERE email = ?`, [this.email],
            (err, results: RowDataPacket[]) => {
                console.log(results);
                if (results[0] == undefined) {
                    this.addUser(response);
                } else {
                    response.status(409).json({ Message: "Email Already Exists" });
                }
            })
    }
    /**
     * sends the query to the database to get all registered users
     * @author Ömer Aynaci
     * @param {express.Response} response 
     */
    public getAllUsers(response: express.Response): void {
        pool.query(`SELECT * FROM user`, [this.email, this.password],
            function (err, results) {
                if (err != null) {
                    response.status(404).json(err.message);
                } else {
                    response.status(200).json(results);
                }
            })
    }
}
