import express, { Express,Request,Response } from "express";
import dotenv from 'dotenv'

dotenv.config()
import sequelize from "./configs/database";

import { clientRoute } from "./routes/client/index.route";

const app:Express=express()
const port:number|String=3000

sequelize;
app.set('views',`${__dirname}/views`);
app.set('view engine','pug')

clientRoute(app);


app.listen(port,()=>{
  console.log(`listening on port ${port}`);
  
}) 