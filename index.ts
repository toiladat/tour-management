import express, { Express,Request,Response } from "express";
import sequelize from "./configs/database";
import dotenv from 'dotenv'
import { clientRoute } from "./routes/client/index.route";
dotenv.config()
const app:Express=express()
const port:number|String=3000

sequelize;
app.set('views',`${__dirname}/views`);
app.set('view engine','pug')

clientRoute(app);


app.listen(port,()=>{
  console.log(`listening on port ${port}`);
  
}) 