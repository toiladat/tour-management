import { Express } from "express";
import {cateogryRoute} from './category.route'
import { systemConfig } from "../../configs/system";
import { tourRoute } from "./tour.route";

const PATH=`/${systemConfig.prefixAdmin}`
export const adminRoute=(app:Express)=>{
  app.use(`${PATH}/categories`,cateogryRoute)
  app.use(`${PATH}/tours`,tourRoute)
}