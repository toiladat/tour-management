import bodyParser from 'body-parser';
import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv'
import { systemConfig } from './configs/system';
dotenv.config()
import sequelize from "./configs/database";


import { clientRoute } from "./routes/client/index.route";
import { adminRoute } from './routes/admin/index.route';

const app: Express = express()
const port: number | String = 3000

app.locals.prefixAdmin = systemConfig.prefixAdmin

sequelize;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
//__dirname: duong dan den folder do tren server
//__dirname local la path den thu muc goc tour-management
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug')
app.use(express.static(`${__dirname}/public`))
clientRoute(app);
adminRoute(app);

app.listen(port, () => {
  console.log(`listening on port ${port}`);

}) 