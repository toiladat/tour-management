import { Express } from "express";
import {cateogryRoute} from './category.route'
import { systemConfig } from "../../configs/system";

const PATH=`/${systemConfig.prefixAdmin}`
export const adminRoute=(app:Express)=>{
  app.use(`${PATH}/categories`,cateogryRoute)
}