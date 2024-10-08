import  bodyParser  from 'body-parser';
import express, { Express,Request,Response } from "express";
import dotenv from 'dotenv'

dotenv.config()
import sequelize from "./configs/database";


import { clientRoute } from "./routes/client/index.route";

const app:Express=express()
const port:number|String=3000

sequelize;
app.use(bodyParser.json());
//__dirname: duong dan den folder do tren server
//__dirname local la path den thu muc goc tour-management
app.set('views',`${__dirname}/views`);
app.set('view engine','pug')
app.use(express.static(`${__dirname}/public`))
clientRoute(app);


app.listen(port,()=>{
  console.log(`listening on port ${port}`);
  
}) 