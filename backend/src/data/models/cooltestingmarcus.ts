import * as express from "express";
import { pool } from "../../Util/database";

export class user {
  public showUsers(req: express.Request, res: express.Response) {
    let email = req.query.email;
    let password = req.query.password;
    

    

    pool.query(
      `SELECT id FROM feag.user WHERE email = "${email}" AND password = "${password}"`,
      function (err: Error, usersresult: any) {



        // let simpleEncryption = Math.round(sqltest[0].id * 15 / Math.PI)
        // console.log(simpleEncryption+" user`Protected`")
        // console.log(Math.round(simpleEncryption * Math.PI / 15)+" userKey")
        // console.log(Math.round(Math.round(simpleEncryption * Math.PI / 15)/999)+" userID")

        if (usersresult[0]?.id == undefined) {
          //console.log(err);
          res.status(404).json("error 404");
        } else {

            // let sessionKey = ((usersresult[0].id * 999 * 15) / Math.PI);
            // usersresult[0].id = sessionKey;
    
          console.log({ users: usersresult });
          res.status(200).json({ users: usersresult });
        }
      }
    );
  }
}
