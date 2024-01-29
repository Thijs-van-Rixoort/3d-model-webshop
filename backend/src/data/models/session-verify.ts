import * as express from "express";
import { OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import Query from 'mysql2/typings/mysql/lib/protocol/sequences/Query';
import { pool } from "../../Util/database";



export class userverify {
  private _id: any;
  private _password: any;

  public constructor(req: express.Request) {
    this._id = req.query.sessionid;
    this._password;

  };

  public verification(req: express.Request, res: express.Response) {
    //let sessionID: any = req.query.sessionid;

    //let userID = Math.round(Math.round((sessionID * Math.PI) / 15) / 999);

    console.log("**");
    console.log(req.query)
    console.log(Number(req.query.sessionid));
    console.log("**");

    // this._id = (((this._id * Math.PI) / 15) / 999);
    console.log(this._id);
    console.log("**");


    pool.query(
      `SELECT username FROM feag.user WHERE id = ${this._id}`,

      (err: Error, user: any) => {  

        
        //username[0]._userName = "bonk";
        console.log({users: user});
        if (user[0] != undefined) {
        user[0].id = JSON.parse(JSON.stringify({users: user[0].username})).users;}
        else {user[0] = 0};

        if (err != null) {
          console.log(err);
          res.status(404).json(err.message);
        } else {
          console.log(
            (this._id) + " userID"
          );

          console.log({ users: user }); //Username Linked to ID
          res.status(200).json({ users: user });
        }
      }
    );
  }
}

// import * as express from 'express';
// import { pool } from "../Util/database"

// export class userverify { public verification(req: express.Request, res: express.Response) {

//     let email = req.query.email
//     let password = req.query.password

//     pool.query(`SELECT username FROM feag.user WHERE email = "${email}" AND password = "${password}" and id = 1 `,
//     function (err: Error, coolresult: any) {

//         console.log("-V-");
//         console.log(coolresult);

//         coolresult[0].id = "wow"

//         // usersresult[0].userName = "sessionKey";

//         // let simpleEncryption = Math.round(sqltest[0].id * 15 / Math.PI)
//         // console.log(simpleEncryption+" user`Protected`")
//         // console.log(Math.round(simpleEncryption * Math.PI / 15)+" userKey")
//         // console.log(Math.round(Math.round(simpleEncryption * Math.PI / 15)/999)+" userID")
//         console.log("-^-");

//         if (err != null) {
//             console.log(err);
//             res.status(404).json(
//                 err.message
//             )}
//         else {
//             res.status(200).json(
//                 {users: coolresult}
//             );
//         }})}

//     };
